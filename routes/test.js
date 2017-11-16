const express = require('express');
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const Shop = require('../models/Shop');
const verifyQueryHMAC = require('../helpers').verifyQueryHMAC;
const shopAdminAPI = require('../helpers').shopAdminAPI;
const router = express.Router();
const verifyPayloadHMAC = require('../helpers').verifyPayloadHMAC;
const scopes = 'write_products,write_themes,write_orders,read_orders';
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

router.post('/webhook', (req, res) => {
    console.log(req);
    console.log(req.headers['X-Shopify-Hmac-Sha256']);
    console.log(req.body);
    if (req.headers['X-Shopify-Hmac-Sha256'] && req.body) {

        if (verifyPayloadHMAC(req, apiSecret)) {
            return res.status(200).send("Webhook Verified!");
        }
        return res.status(401).send("Unauthorized Webhook Request! HMAC verification fails");
    }

    return res.status(401).send("Unauthorized Webhook Request! body or HMAC header missing.");
});

module.exports = router;