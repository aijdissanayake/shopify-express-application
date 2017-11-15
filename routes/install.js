//const dotenv = require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const Shop = require('../models/Shop');
const verifyHMAC = require('../helpers').verifyHMAC;
const shopAdminAPI = require('../helpers').shopAdminAPI;
const router = express.Router();
const scopes = 'write_products,write_themes,write_orders,read_orders';
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

//installation route
router.get('/', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + '/install/callback';
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    res.cookie('state', state);
    res.redirect(installUrl);
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
    if (!verifyHMAC(req.query, apiSecret)) {
      return res.status(400).send('HMAC validation failed');
    }
    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then((accessTokenResponse) => {
        const accessToken = accessTokenResponse.access_token;

        Shop.findOne({ 'name': shop }, 'name access_token', function (err, installedShop) {
          if (err) return handleError(err);
          //to use if a shop record is alredy there
          if (installedShop) {
            installedShop.access_token = accessToken;
            installedShop.save(function () {
              if (err) return handleError(err);
            });
          }
          else {
            var ShopInstance = new Shop({ name: shop, access_token: accessToken });

            ShopInstance.save(function (err) {
              if (err) {
                return handleError(err);
              }
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
          uri: 'https://' + shop + '/admin/themes.json',
          headers: shopRequestHeaders,
          json: true
        };

        //shopAdminAPI('GET', shop, '/admin/themes.json', shopRequestHeaders,

        request(getThemeOptions)
          .then(
            function (parsedBody) {

            var theme_id;
            var themes = parsedBody.themes;
            console.log('getting theme id');

            for (var i = 0; i < themes.length; i++) {
              if (themes[i].role == "main") {
                theme_id = themes[i].id;
                console.log(theme_id);
                break;
              }
            }

            var timestamp = new Date().getTime();
            var assetOptions = {
              method: 'PUT',
              //need to set get theme id
              uri: 'https://' + shop + '/admin/themes/' + theme_id + '/assets.json',
              headers: shopRequestHeaders,
              body: {
                "asset": {
                  "key": "assets\/tracified" + timestamp + ".gif",
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
        res.status(400).send(error);
      });

  } else {
    res.status(400).send('Required parameters missing');
  }
});

module.exports = router;