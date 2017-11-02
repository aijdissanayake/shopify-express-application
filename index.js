const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const scopes = 'read_products';
const forwardingAddress = "https://6c9cce84.ngrok.io"; // Replace this with your HTTPS Forwarding address

//html rendering
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/about', function (req, res) {
  res.render('about.html');
});

app.get('/trace', function (req, res) {
  res.send({
    'Order id': req.query.id,
    'Shop': req.query.shop,
    'Data': 'No Tracified Data Found'
  });
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/shopify', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress + '/shopify/callback';
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

app.get('/shopify/callback', (req, res) => {
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

    const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
    const accessTokenPayload = {
      client_id: apiKey,
      client_secret: apiSecret,
      code,
    };

    request.post(accessTokenRequestUrl, { json: accessTokenPayload })
      .then((accessTokenResponse) => {
        const accessToken = accessTokenResponse.access_token;

        // const shopRequestUrl = 'https://' + shop + '/admin/shop.json';
        const shopRequestHeaders = {
          'X-Shopify-Access-Token': accessToken,
        };

        //asset uploading
        // var options = {
        //   method: 'PUT',
        //   uri: 'https://99xnsbm.myshopify.com/admin/themes/4664033312/assets.json',
        //   headers: shopRequestHeaders,
        //   body: {
        //     "asset": {
        //       "key": "assets\/emputty.gif",
        //       "attachment": "R0lGODlhAQABAPABAP\/\/\/wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
        //     }
        //   },
        //   json: true // Automatically stringifies the body to JSON
        // };

        res.render('about.html');

        // request(options)
        //   .then(function (parsedBody) {
        //     res.render('about.html');
        //   })
        //   .catch(function (err) {
        //     return (err);
        //   });


        // res.redirect('https://c4f5c707.ngrok.io/');
        // request.get(shopRequestUrl, { headers: shopRequestHeaders })
        //   .then((shopResponse) => {
        //     res.end(shopResponse);
        //   })
        //   .catch((error) => {
        //     res.status(error.statusCode).send(error.error.error_description);
        //   });
        // TODO
        // Use access token to make API call to 'shop' endpoint
      })
      .catch((error) => {
        res.status(error.statusCode).send(error.error.error_description);
      });
    // TODO
    // Validate request is from Shopify
    // Exchange temporary code for a permanent access token
    // Use access token to make API call to 'shop' endpoint
  } else {
    res.status(400).send('Required parameters missing');
  }
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
