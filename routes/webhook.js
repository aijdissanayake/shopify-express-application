const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

//uinstall app webhook handler
router.get('/uninstall-app', (req, res) => {
    var shop = req.get('X-Shopify-Shop-Domain');
    console.log('App is unistalled by' + shop);
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
});

module.exports = router;