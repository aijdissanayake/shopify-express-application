const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const crypto = require('crypto');
const cookie = require('cookie');
const nonce = require('nonce')();
const querystring = require('querystring');
const request = require('request-promise');
const Shop = require('../models/Shop');
const router = express.Router();
const scopes = 'write_products,write_themes,write_orders';
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

router.get('/', (req, res) => {
    const shop = req.query.shop;
    if (shop) {

        Shop.findOne({ 'name': shop }, 'name access_token', function (err, dbshop) {
            if (err) return handleError(err);
            if (dbshop && dbshop.access_token) {
                res.status(200).send("Your shop has been authorized and token has been saved. Admin API can be accessed using the token ");
            }
            else {
                const state = nonce();
                const redirectUri = forwardingAddress + '/shopify/callback';
                const installUrl = 'https://' + shop +
                    '/admin/oauth/authorize?client_id=' + apiKey +
                    '&scope=' + scopes +
                    '&state=' + state +
                    '&redirect_uri=' + redirectUri;

                res.cookie('state', state);
                res.redirect(installUrl);
            }
        });
    } else {
        return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request');
    }
});

module.exports = router;