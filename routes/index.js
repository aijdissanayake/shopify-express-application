const express = require('express');
const router = express.Router(); const
Shop = require('../models/Shop');
const shopAdminAPI = require('../helpers').shopAdminAPI;

//index route
router.get('/', (req, res) => {
    //res.send('Tracified - Shopify- modularized');
    const shop = req.query.shop;
    if (shop) {
        const query = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join('&');
        Shop.findOne({ 'name': shop }, 'name access_token', function (err, dbshop) {
            if (err) return handleError(err);
            if (dbshop && dbshop.access_token) {
                //test shopifyAPI call
                const shopRequestHeaders = {
                    'X-Shopify-Access-Token': dbshop.accessToken,
                };

                shopAdminAPI('GET', shop, '/admin/orders.json', shopRequestHeaders, function(orders){
                    res.status(200).send(orders);                
                });
            }
            else {
                return res.redirect(`/install/?${query}`);
            }
        });
    } else {
        return res.status(200).send('App Details and Tracified Details goes here');
    }
});

module.exports = router;