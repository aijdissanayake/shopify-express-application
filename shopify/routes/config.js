const express = require('express');
const router = express.Router();
//const Shop = require('../models/Shop');
const Mapping = require('../models/ShopifyMapping');

router.all('/*', function (req, res, next) {
    if (req.session && req.session.shop) {
        next();
    } else {
        console.log('cookies not found');
        res.send('cookies not found, Please try re-openning the app.');
    }

});

router.get('/mapping', (req, res) => {
    const shop = req.session.shop;
    Mapping.findOne({ 'shop_name': shop.name }, function (err, mapping) {
        if (err) return handleError(err);
        return mapping.mapping;
        // if (mapping && Object.keys(mapping).length) {
        //     return
        // } else {
        // }
    });
});

router.post('/mapping', (req, res) => {
    const shop = req.session.shop;
    const shop = "test-shop";
    Mapping.findOne({ 'shop_name': shop }, function (err, mapping) { // use if a mapping record is alredy there
        if (err) return handleError(err);
        if (mapping) {
            mapping.mapping = req.body.mapping;
            mapping.save(function () {
                if (err) return handleError(err);
            });
        }
        else {
            var mappingInstance = new Mapping({ shop_name: shop, mapping: req.body.mapping });
            mappingInstance.save(function (err) {
                if (err) {
                    return handleError(err);
                }
            });
        }
    });
});

module.exports = router;