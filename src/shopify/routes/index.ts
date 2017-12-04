import { Request, Response, Router } from "express";
import { Error } from "mongoose";
import {Shop, ShopModel} from "../models/Shop";
const shopAdminAPI = require("../helpers").shopAdminAPI;
const install = require("./install");
const webhook = require("./webhook");
const adminlink = require("./adminlink");
const shopAPI = require("./shop-api");
const config = require("./config");
const test = require("./test");
const path = require("path");
const router = Router(); 
/**
 * routes
 */
router.use("/install", install);
router.use("/webhook", webhook);
router.use("/adminlink", adminlink);
router.use("/shop-api", shopAPI);
router.use("/config",config);
router.use("/test", test);
/**
 * -shopify index route - all the requests from shopify admin app lists 
 * and installation requests will be directed here.(i.e in Partner Dashboard App URL is set to this.)
 * (all of them includes a query parameter "shop" which holds the shop domain of the particular shop).
 * cookies are set here and redirected to the "/cookie-check".
 */
router.get("/", (req: Request, res: Response) => {
    const shop = req.query.shop;
    if (shop) {
        const query = Object.keys(req.query).map((key) => `${key}=${req.query[key]}`).join("&");
        Shop.findOne({ "name": shop }, "name access_token", function (err: Error, exisitingShop: ShopModel) {
            if (err) return res.status(503).send("error with db connection. Plese try again in a while");
            if (exisitingShop && exisitingShop.access_token) {
                req["session"].shop = exisitingShop;
                return res.redirect("/shopify/cookie-check");
            } else {
                return res.redirect(`/shopify/install/?${query}`);
            }
        });
    } else {
        return res.status(200).send("Shopify App Details and Tracified Details goes here");
    }
});

/**
 * -this route is used for detect whether cookies are enabled in the browser calling to the shopify index route 
 */
router.get("/cookie-check", (req: Request, res: Response) => {
    if (req["session"] && req["session"].shop) {
        //temperorily directed to mapping table view. May be have to change it orders view or so.
        return res.redirect("/shopify/product-mapping");
    } else {
        console.log("cookie disabled");
        res.send("cookie disabled, You need to enable browser cookie to use the plugin without interruptions. Please enable cookies and retry.");
    }
});
/**
 * -redirects to the react view, if not handled above. 
 * (this implies that routing in react app and node api should not have conflicts)
 * hence all remaining requests will be handled by the react-router in react-app.
 */
router.get("*", function(req: Request, res: Response) {
  res.sendFile(path.resolve(__dirname, "../react-app/build", "index.html"));
});

export { router };
