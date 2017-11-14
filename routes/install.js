//const dotenv = require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const Shop = require('../models/Shop');
const router = express.Router();
const scopes = 'write_products,write_themes,write_orders';
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

//installation route
router.get('/', (req, res) => {
    const shop = req.query.shop;
    if (shop) {
        // Shop.findOne({ 'name': shop }, 'name access_token', function (err, dbshop) {
        //     if (err) return handleError(err);
        //     if (dbshop && dbshop.access_token) {                
        //         res.status(200).send("Your shop has been authorized and token has been saved. Admin API can be accessed using the token ");
        //     }
        //     else {
                const state = nonce();
                const redirectUri = forwardingAddress + '/install/callback';
                const installUrl = 'https://' + shop +
                    '/admin/oauth/authorize?client_id=' + apiKey +
                    '&scope=' + scopes +
                    '&state=' + state +
                    '&redirect_uri=' + redirectUri;

                res.cookie('state', state);
                res.redirect(installUrl);
        //     }
        // });
    } else {
        return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
});

//callback url on app installation
router.get('/callback', (req, res) => {
    const { shop, hmac, code, state } = req.query;
    const stateCookie = cookie.parse(req.headers.cookie).state;
  
    if (state !== stateCookie) {
      return res.status(403).send('Request origin cannot be verified');
    }
  
    if (shop && hmac && code) {
      const map = Object.assign({}, req.query);
      delete map['signature'];
      delete map['hmac'];
      const message = querystring.stringify(map);
      const generatedHash = crypto
        .createHmac('sha256', apiSecret)
        .update(message)
        .digest('hex');
  
      if (generatedHash !== hmac) {
        return res.status(400).send('HMAC validation failed');
      }
  
      console.log("code");
      console.log(code);
  
      const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
      const accessTokenPayload = {
        client_id: apiKey,
        client_secret: apiSecret,
        code,
      };
  
  
  
      request.post(accessTokenRequestUrl, { json: accessTokenPayload })
        .then((accessTokenResponse) => {
          const accessToken = accessTokenResponse.access_token;
          console.log('accessToken');
          console.log(accessToken);
  
          Shop.findOne({ 'name': shop }, 'name access_token', function (err, installedShop) {
            if (err) return handleError(err);
            console.log('ready to save unistalled shop');
            //to use if the shopnme is alredy there
            if (installedShop) {
              console.log('existing installed shop is');
              console.log(installedShop)
              installedShop.access_token = accessToken;
              installedShop.save(function () {
                if (err) return handleError(err);
                console.log("new access token saved for existing shop");
              });
            }
            else {
              var ShopInstance = new Shop({ name: shop, access_token: accessToken });
  
              ShopInstance.save(function (err) {
                if (err) {
                  console.log('db ERROR');
                  console.log(err);
                  return handleError(err);
                }
                console.log('new shop saved with access token!');
              });
            }
          });
  
  
  
          const shopRequestHeaders = {
            'X-Shopify-Access-Token': accessToken,
          };
  
          //asset uploading
          //get the theme id
          var getThemeOptions = {
            method: 'GET',
            //need to set get theme id
            uri: 'https://' + shop + '/admin/themes.json',
            headers: shopRequestHeaders,
            json: true
          };
  
          request(getThemeOptions)
            .then(function (parsedBody) {
  
              var theme_id;
              var themes = parsedBody.themes;
              console.log('getting theme id');

              for (var i = 0; i < themes.length; i++) {
                if (themes[i].role == "main"){
                  theme_id = themes[i].id;
                  console.log(theme_id); 
                  break;
                }
              }
  
              var timestamp = new Date().getTime();
              var assetOptions = {
                method: 'PUT',
                //need to set get theme id
                uri: 'https://' + shop + '/admin/themes/'+theme_id+'/assets.json',
                headers: shopRequestHeaders,
                body: {
                  "asset": {
                    "key": "assets\/tracified"+timestamp+".gif",
                    "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
                  }
                },
                json: true
              };
  
              request(assetOptions)
                .then(function (parsedBody) {
                  console.log('assets uploaded');
                  console.log(parsedBody);
                })
                .catch(function (err) {
                  return (err);
                });
  
            })
            .catch(function (err) {
              return (err);
            });
  
          //register uninstallation webhook
          console.log('webhook registration');
          var uninstallOptions = {
            method: 'POST',
            uri: 'https://' + shop + '/admin/webhooks.json',
            headers: shopRequestHeaders,
            body: {
              'webhook':
              {
                'topic': "app/uninstalled",
                'address': forwardingAddress + '/webhook/uninstall-app',
                'format': "json"
              }
            },
            json: true
          };
  
          request(uninstallOptions)
            .then(function (parsedBody) {
              console.log('uninstall webhook registered');
              console.log(parsedBody);
            })
            .catch(function (err) {
              return (err);
            });
          console.log('webhook registration request sent');
  
          res.render('about.html');
  
  
        })
        .catch((error) => {
          res.status(error.statusCode).send(error.error.error_description);
        });
  
    } else {
      res.status(400).send('Required parameters missing');
    }
});

module.exports = router;