const express = require('express');
const app = express();
const cookie = require('cookie');
const mongoose = require('mongoose');
const shopifyRouter = require('./shopify/routes/index');
const woocommerceRouter = require('./woocommerce/routes/index');
const bodyParser = require('body-parser');
const session = require('client-sessions');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  cookieName: 'session',
  secret: '7f3bc78eabe74bdca213aceb9cfcc1f4',
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.set('port', process.env.PORT || 3000);

//html rendering - if needed
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


//db connection
  //Set up default mongoose connection
var mongoDB = 'mongodb://shopify:Tracified@ds251435.mlab.com:51435/shopify-db';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
  //Get the default connection
var db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//routes
  //shopify routes
app.use('/shopify', shopifyRouter);
  //woocommerce routes
app.use('/woocommerce', woocommerceRouter);
  //react-view
app.use(express.static(path.resolve(__dirname, './shopify/react-app/build')));
  // All remaining requests return the React app, so it can handle routing.
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './shopify/react-app/build', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Example app listening on port ' + app.get('port') + '!');
});

//app installation urls
//https://shopify-tracified.herokuapp.com/?shop=99xnsbm.myshopify.com