const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const shopAdminAPI = require('../helpers').shopAdminAPI;

router.all('/*', function (req, res, next) {
    if (req.session && req.session.shop) {
        req.shopRequestHeaders = {
            'X-Shopify-Access-Token': req.session.shop.access_token,
        };
        next();
    } else {
        console.log('cookies disabled');
        res.send('cookies not found, Please try re-openning the app.');
    }

});

router.get('/products', (req, res) => {
    console.log('products');
    shopAdminAPI('GET', req.session.shop.name, '/admin/products.json', req.shopRequestHeaders, null, function (products) {
        console.log('got products');
        res.status(200).send(products);
    });
});

router.get('/orders', (req, res) => {
    console.log('orders');
    shopAdminAPI('GET', req.session.shop.name, '/admin/orders.json', req.shopRequestHeaders, null, function (orders) {
        console.log('got orders');
        res.status(200).send(orders);
    });
});

module.exports = router;