import { NextFunction, Request, Response, Router } from "express";
import * as tracifiedServices from "../../tracified/services";
import { Shop, ShopModel } from "../models/Shop";
import { Error } from "mongoose";

const router = Router();

router.all('/*',  (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.get("/:product/enabled", (req: Request, res: Response) => {
    const shop = req.query.shop;
    if (shop) {
        return res.json({enabled: true});
    }
    else{
        return res.json({enabled: false});
    }
});

export { router };
