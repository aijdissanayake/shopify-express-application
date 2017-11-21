const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const Shop = require('./models/Shop');
const mongoose = require('mongoose');
const index = require('./routes/index');
const install = require('./routes/install');
const webhook = require('./routes/webhook');
const adminlink = require('./routes/adminlink');
const test = require('./routes/test');
const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";
const scopes = 'write_products,write_themes,write_orders';
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
var bodyParser = require('body-parser');
//react-view
const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);

//html rendering
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

//Set up default mongoose connection
var mongoDB = 'mongodb://shopify:Tracified@ds251435.mlab.com:51435/shopify-db';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', index);
app.use('/install', install);
app.use('/webhook', webhook);
app.use('/adminlink', adminlink);
//test routes
app.use('/test', test);
//react-view
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './react-app/build')));
// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './react-app/build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Example app listening on port ' + app.get('port') + '!');
});

//app installation urls
//https://shopify-tracified.herokuapp.com/?shop=99xnsbm.myshopify.com