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

router.get("/products", (req: Request, res: Response) => {
    console.log("products");
    console.log(req["session"].shop.name);
    shopAdminAPI("GET", req["session"].shop.name, "/admin/products.json", req["shopRequestHeaders"], null, (products: object) => {
        console.log("got products");
        res.status(200).send(products);
    });
});

router.get("/orders", (req: Request, res: Response) => {
    console.log("orders");
    shopAdminAPI("GET", req["session"].shop.name, "/admin/orders.json", req["shopRequestHeaders"], null, (orders: any) => {
        console.log("got orders");
        let unFulfilledOrders = orders.orders.filter((order: object) => {
            return order["fulfillment_status"] != "fulfilled"
        });
        res.status(200).send({orders : unFulfilledOrders});
    });
});

router.get("/fulfilled-orders", (req: Request, res: Response) => {
    console.log("orders");
    shopAdminAPI("GET", req["session"].shop.name, "/admin/orders.json?status=any", req["shopRequestHeaders"], null, (orders: any) => {
        console.log("got all orders");

        let fulfilledOrders = orders.orders.filter((order: object) => {
            console.log("inside fulfilled function");
            return order["fulfillment_status"] == "fulfilled"
        });
    res.status(200).send({fulfilledOrders});
    });
});

router.get("/orders/:id/fulfill", (req: Request, res: Response) => {
    const url: string = "/admin/orders/"+ req.params.id +"/fulfillments.json";
    const body: object = {
        "fulfillment": {
          "tracking_number": null,
          "notify_customer": true
        }
      }
    shopAdminAPI("POST", req["session"].shop.name, url , req["shopRequestHeaders"], body, (fulfillment: any) => {
        console.log("order fulfilled");
        res.status(200).send(fulfillment);
    });
});

export { router };