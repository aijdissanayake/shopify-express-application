const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');

const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";
const scopes = 'write_products,write_themes,write_orders';
//const forwardingAddress = "https://6c9cce84.ngrok.io"; // Replace this with your HTTPS Forwarding address
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
const Shop = require('./models/Shop');
const mongoose = require('mongoose');
const install = require('./routes/install');
const webhook = require('./routes/webhook');



//Set up default mongoose connection
var mongoDB = 'mongodb://shopify:Tracified@ds251435.mlab.com:51435/shopify-db';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.set('port', process.env.PORT || 3000);

//html rendering
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


//test route
app.get('/trace', function (req, res) {
  res.send({
    'Order id': req.query.id,
    'Shop': req.query.shop,
    'Data': 'No Tracified Data Found'
  });
});

//end of test routes
app.get('/', (req, res) => {
  res.send('Tracified - Shopify');
});


//uinstall app webhook handler
// app.post('/uninstall-app', (req, res) => {
//   var shop = req.get('X-Shopify-Shop-Domain');
//   console.log('App is unistalled by' + shop);
//   if (shop) {
//     Shop.findOne({ 'name': shop }, 'name access_token', function (err, uninstalledShop) {
//       if (err) return handleError(err);
//       if (uninstalledShop) {
//         uninstalledShop.access_token = null;
//         uninstalledShop.save(function () {
//           if (err) return handleError(err);
//           console.log("access token removed from the app uninstalled shop");
//         });
//       }
//     });
//     res.status(200).send('webhook recieved');
//   }
// });

app.use('/install', install);
app.use('/webhook', webhook);

app.listen(app.get('port'), () => {
  console.log('Example app listening on port ' + app.get('port') + '!');
});

//app installation urls
//https://6c9cce84.ngrok.io/shopify?shop=99xnsbm.myshopify.com
//https://shopify-tracified.herokuapp.com/shopify?shop=99xnsbm.myshopify.com




