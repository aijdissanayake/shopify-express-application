const express = require('express');
const router = express.Router(); 
const Shop = require('../models/Shop');
const shopAdminAPI = require('../helpers').shopAdminAPI;

router.get('/products', (req, res) => {
    if (req.session && req.session.shop) {
        console.log('cookie enbaled');
        let shop = req.session.shop;
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': shop.access_token,
        };
        shopAdminAPI('GET', shop.name , '/admin/products.json', shopRequestHeaders,null, function(orders){
            res.status(200).send(orders);                
        });
    } else {
        console.log('cookies disabled');
        res.send('cookies disabled, You need to enable browser cookies to use the plugin without interruptions. Please enable cookies and retry.');
    }
});

module.exports = router;