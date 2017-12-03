const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const verifyWebhook = require('../middleware').verifyWebhook2;

//uinstall app webhook handler
//uncomment following after Webhook verification is sorted
//router.post('/uninstall-app', verifyWebhook, (req, res) => {
router.post('/uninstall-app',(req, res) => {
    var shop = req.get('X-Shopify-Shop-Domain');
    console.log('App is unistalled by ' + shop);
    if (shop) {
        Shop.findOne({ 'name': shop }, 'name access_token', function (err, uninstalledShop) {
            if (err) return handleError(err);
            if (uninstalledShop) {
                uninstalledShop.access_token = null;
                uninstalledShop.save(function () {
                    if (err) return handleError(err);
                    console.log("access token removed from the app uninstalled shop");
                });
            }
        });
        res.status(200).send('webhook recieved');
    }
    else{
        res.status(200).send('No shop in the header');
    }
});

module.exports = router;