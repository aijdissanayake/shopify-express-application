import { Request, Response, Router } from "express";
import { Error } from "mongoose";
const router = Router();
const crypto = require("crypto");
const cookie = require("cookie");
const nonce = require("nonce")();
const querystring = require("querystring");
const request = require("request-promise");
const Shop = require("../models/Shop");
const verifyQueryHMAC = require("../helpers").verifyQueryHMAC;
const shopAdminAPI = require("../helpers").shopAdminAPI;
const { getTracifiedItemList, getOrderTraceabilityData } = require("../../tracified/services");
const verifyPayloadHMAC = require("../helpers").verifyPayloadHMAC;
const scopes = "write_products,write_themes,write_orders,read_orders";
const forwardingAddress = "https://shopify-tracified.herokuapp.com";
const apiKey = "7f3bc78eabe74bdca213aceb9cfcc1f4";
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

router.post("/webhook", (req, res) => {
    //console.log(req);
    console.log(req.get("X-Shopify-Hmac-Sha256"));
    console.log(req.get("X-Shopify-Shop-Domain"));
    //console.log(req.body);
    if (req.get("X-Shopify-Hmac-Sha256") && req.body) {

        if (verifyPayloadHMAC(req.body, req.get("X-Shopify-Hmac-Sha256"), apiSecret)) {
            return res.status(200).send("Webhook Verified!");
        }
        return res.status(401).send("Unauthorized Webhook Request! HMAC verification fails");
    }

    return res.status(401).send("Unauthorized Webhook Request! body or HMAC header missing.");
});

router.get("/api", (req, res) => {
    res.send({ "message": "Tracified/Shopify API can be used" });
});

router.get("/services/item-list", (req, res) => {

    getTracifiedItemList().then((data: any) => {
        console.log(data);
        return res.send(data);
    }).catch((err: Error) => {
        return err;
    });
});

router.get("/services/order-details", (req, res) => {

    getOrderTraceabilityData().then((data: any) => {
        console.log(data);
        return res.send(data);
    }).catch((err: Error) => {
        return err;
    });
});

router.get("/shop-link", (req, res) => {
    console.log("cookie-checking");
    console.log(req["session"]);
    if (req["session"] && req["session"].shop) {
        console.log("cookie");
        console.log(req["session"].shop);
        console.log(req["session"].shop.name);
        res.render("about.html");
    }
    //res.send(ref);
});

router.get("/set-cookie", (req, res) => {
    req["session"].test = { "test": "cookie" };
    return res.redirect("/test/test-cookie");
});

router.get("/test-cookie", (req, res) => {
    if (req["session"] && req["session"].test) {
        console.log("cookie enabled");
        console.log(req["session"].test);
        res.send("cookie enabled");
    } else {
        console.log("cookie enabled");
        console.log(req["session"].test);
        res.send("cookie disabled, You need to enable browser cookie to use the plugin without interruptions. Please enable cookies and retry.");
    }
});

router.get("/route-check", (req, res) => {
    return res.send("Route check successful");
});

export { router };
