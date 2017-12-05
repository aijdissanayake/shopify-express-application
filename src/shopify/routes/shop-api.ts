import { NextFunction, Request, Response, Router } from "express";
import { Error } from "mongoose";
const router = Router();
const shopAdminAPI = require("../helpers").shopAdminAPI;

router.all("/*", (req: Request, res: Response, next: NextFunction) => {
    if (req["session"] && req["session"].shop) {
        req["shopRequestHeaders"] = {
            "X-Shopify-Access-Token": req["session"].shop.access_token,
        };
        next();
    } else {
        console.log("cookies disabled");
        res.send("cookies not found, Please try re-openning the app.");
    }

});

router.get("/products", (req, res) => {
    console.log("products");
    console.log(req["session"].shop.name);
    shopAdminAPI("GET", req["session"].shop.name, "/admin/products.json", req["shopRequestHeaders"], null, (products: any) => {
        console.log("got products");
        res.status(200).send(products);
    });
});

router.get("/orders", (req, res) => {
    console.log("orders");
    shopAdminAPI("GET", req["session"].shop.name, "/admin/orders.json", req["shopRequestHeaders"], null, (orders: any) => {
        console.log("got orders");
        res.status(200).send(orders);
    });
});

export { router };