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
                req.session.shop = dbshop;
                return res.redirect('/cookie-check');
            } else {
                return res.redirect(`/install/?${query}`);
            }
        });
    } else {
        return res.status(200).send('App Details and Tracified Details goes here');
    }
});

//cookie check and request handle route redirected from index route
router.get('/cookie-check', (req, res) => {
    if (req.session && req.session.shop) {
        //test shopifyAPI call
        let shop = req.session.shop;
        const shopRequestHeaders = {
            'X-Shopify-Access-Token': shop.access_token,
        };
        shopAdminAPI('GET', shop.name , '/admin/orders.json', shopRequestHeaders,null, function(orders){
            res.status(200).send(orders);                
        });
    } else {
        console.log('cookie disabled');
        res.send('cookie disabled, You need to enable browser cookie to use the plugin without interruptions. Please enable cookies and retry.');
    }
});

router.get('/about', (req, res) => { res.render('about.html');});
router.get('/contact', (req, res) => { res.send("Tracified Contact Details");});


module.exports = router;