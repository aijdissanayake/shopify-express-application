import { NextFunction, Request, Response, Router } from "express";
import {ShopifyMapping, ShopifyMappingModel} from "../models/ShopifyMapping";
import { Error } from "mongoose";
const router = Router();

router.all("/*", (req: Request, res: Response, next: NextFunction) => {
    if (req["session"] && req["session"].shop) {
        next();
    } else {
        console.log("cookies not found");
        res.send("cookies not found, Please try re-openning the app.");
    }

});

router.get("/mapping", (req: Request, res: Response) => {
    const shop = req["session"].shop;
    ShopifyMapping.findOne({ "shop_name": shop.name }, (err: Error, mapping: ShopifyMappingModel) => {
        if (err) return res.status(503).send("error with db connection. Plese try again in a while");
        return res.send(mapping.mapping);
    });
});

router.post("/mapping", (req: Request, res: Response) => {
    const shop = req["session"].shop;
    ShopifyMapping.findOne({ "shop_name": shop.name }, (err: Error, mapping: ShopifyMappingModel) => { // use if a mapping record is alredy there
        if (err) return res.status(503).send("error with db connection. Plese try again in a while");
        if (mapping) {
            mapping.mapping = req.body.mapping;
            mapping.save((err: Error) => {
                if (err) return res.status(503).send("error with db connection. Plese try again in a while");
                res.send("mapping successfully saved");
            });
        }
        else {
            var mappingInstance = new ShopifyMapping({ shop_name: shop.name, mapping: req.body.mapping });
            mappingInstance.save( (err: Error) => {
                if (err) return res.status(503).send("error with db connection. Plese try again in a while");
                res.send("mapping successfully saved");
            });
        }
    });
});

// router.get("/mapping", (req: Request, res: Response) => {

// });

export { router };
