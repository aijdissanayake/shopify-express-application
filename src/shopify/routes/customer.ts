import { NextFunction, Request, Response, Router } from "express";
import * as tracifiedServices from "../../tracified/services";
import { Shop, ShopModel } from "../models/Shop";
import { ShopifyMapping, ShopifyMappingModel } from "../models/ShopifyMapping";
import { Error } from "mongoose";

const router = Router();

router.all('/*', (req: Request, res: Response, next: NextFunction) => {
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
                enabled: mapping.mapping[productID][1],
                itemID: mapping.mapping[productID][0]
            });
        });
    }
    else {
        return res.json({ enabled: false });
    }
});

router.get("/artifacts/:itemID", (req: Request, res: Response) => {
    const shop = req.query.shop;
    const itemID = req.params.itemID;

    Shop.findOne({ "name": shop }, "tracified_token", function (err: Error, shop: ShopModel) {
        if (err) return res.status(503).send("error with db connection. Plese try again in a while");
        if (shop && shop.tracified_token) {
            tracifiedServices["getProductArtifacts"](itemID, shop.tracified_token).then((data: any) => {
                res.send(data);
            });
        } else {
            res.status(401).send("Unauthorized");
        }
    });
});

export { router };
