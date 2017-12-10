import { NextFunction, Request, Response, Router } from "express";
import { Error } from "mongoose";
const router = Router();
const shopAdminAPI = require("../helpers").shopAdminAPI;
const shopName = "99xnsbm.myshopify.com";
const shopRequestHeaders = {
    "X-Shopify-Access-Token": "94687cbe08d0e4024c74f8adbffa94ca",
};

// router.all("/*", (req: Request, res: Response, next: NextFunction) => {
//     if (req["session"] && req["session"].shop) {
//         req["shopRequestHeaders"] = {
//             "X-Shopify-Access-Token": req["session"].shop.access_token,
//         };
//         next();
//     } else {
//         console.log("cookies disabled");
//         res.send("cookies not found, Please try re-openning the app.");
//     }

// });

router.get("/products", (req: Request, res: Response) => {
    console.log("products");
    // console.log(req["session"].shop.name);
    // const shopName = req["session"].shop.name;
    // const shopRequestHeaders = req["shopRequestHeaders"];
    shopAdminAPI("GET", shopName, "/admin/products.json", shopRequestHeaders, null, (products: object) => {
        console.log("got products");
        return res.status(200).send(products);
    });
});

router.get("/orders", (req: Request, res: Response) => {
    console.log("orders");
    // const shopName = req["session"].shop.name;
    // const shopRequestHeaders = req["shopRequestHeaders"];
    shopAdminAPI("GET", shopName, "/admin/orders.json", shopRequestHeaders, null, (orders: any) => {
        console.log("got orders");
        res.status(200).send(orders);
    });
});

export { router };