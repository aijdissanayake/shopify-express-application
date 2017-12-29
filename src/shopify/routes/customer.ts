import { NextFunction, Request, Response, Router } from "express";
import * as tracifiedServices from "../../tracified/services";
import {ShopifyMapping, ShopifyMappingModel} from "../models/ShopifyMapping";
import { Error } from "mongoose";

const router = Router();

router.all('/*',  (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get("/:productID/enabled", (req: Request, res: Response) => {
    const shop = req.query.shop;
    const productID = req.params.productID;
    if (shop) {
        ShopifyMapping.findOne({ "shop_name": shop }, (err: Error, mapping: ShopifyMappingModel) => {
            if (err) return res.status(503).send("error with db connection. Plese try again in a while");
            return res.json({
                enabled:mapping.mapping[productID][1],
                itemID:mapping.mapping[productID][0]
            });
        });
    }
    else{
        return res.json({enabled: false});
    }
});

export { router };
