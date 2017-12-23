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

//avoid CORS
router.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

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

router.get("/products/:id/images", (req: Request, res: Response) => {
    console.log("orders");
    // const shopName = req["session"].shop.name;
    // const shopRequestHeaders = req["shopRequestHeaders"];
    const url = "/admin/products/"+req.params.id+"/images.json"
    shopAdminAPI("GET", shopName, url, shopRequestHeaders, null, (images: any) => {
        console.log("got orders");
        res.status(200).send(images);
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
    shopAdminAPI("POST", shopName, url , shopRequestHeaders, body, (orders: any) => {
        console.log("order fulfilled");
        res.status(200).send(orders);
    });
});

export { router };