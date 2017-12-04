import { Request, Response, Router } from "express";
import { Error } from "mongoose";
import {Shop, ShopModel} from "../models/Shop";
const router = Router();
const verifyWebhook = require('../middleware').verifyWebhook2;

//uinstall app webhook handler
//uncomment following after Webhook verification is sorted
//router.post('/uninstall-app', verifyWebhook, (req, res) => {
router.post('/uninstall-app',(req, res) => {
    var shop = req.get('X-Shopify-Shop-Domain');
    console.log('App is unistalled by ' + shop);
    if (shop) {
        Shop.findOne({ 'name': shop }, 'name access_token', function (err: Error, uninstalledShop: ShopModel) {
            if (err) return res.status(503).send("error with db connection. Plese try again in a while");
            if (uninstalledShop) {
                uninstalledShop.access_token = null;
                uninstalledShop.save(function () {
                    if (err) return res.status(503).send("error with db connection. Plese try again in a while");
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

export { router };