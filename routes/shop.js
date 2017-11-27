const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');
const shopAdminAPI = require('../helpers').shopAdminAPI;

// router.all('/*', function (req, res, next) {
//     if (req.session && req.session.shop) {
//         console.log('cookie enbaled');
//         req.shopRequestHeaders = {
//             'X-Shopify-Access-Token': req.session.shop.access_token,
//         };
//         next();
//     } else {
//         console.log('cookies disabled');
//         res.send('cookies disabled, You need to enable browser cookies to use the plugin without interruptions. Please enable cookies and retry.');
//     }

// });

router.get('/products', (req, res) => {
    console.log('products');
    if (req.session && req.session.shop) {
        console.log('cookie enbaled');
        let shop = req.session.shop;
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': shop.access_token,
        };
        console.log('cookie found');
        shopAdminAPI('GET', shop.name, '/admin/products.json', shopRequestHeaders, null, function (products) {
            console.log('got products');
            res.status(200).send(products);
        });
    } else {
        console.log('cookies disabled');
        res.send('cookies disabled, You need to enable browser cookies to use the plugin without interruptions. Please enable cookies and retry.');
    }
});

router.get('/orders', (req, res) => {
    shopAdminAPI('GET', shop.name, '/admin/orders.json', shopRequestHeaders, null, function (orders) {
        res.status(200).send(orders);
    });
});

module.exports = router;