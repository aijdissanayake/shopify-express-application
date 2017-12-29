import { NextFunction, Request, Response, Router } from "express";
import * as tracifiedServices from "../../tracified/services";
import { Shop, ShopModel } from "../models/Shop";
import { Error } from "mongoose";

const router = Router();

router.all("/*", (req: Request, res: Response, next: NextFunction) => {
    if (req["session"] && req["session"].shop) {
        if(req["session"].shop.tracified_token){
            next();
        }
        else{
            res.status(401).send("Account Verification Failed. Please try reinstalling the Plugin");
        }
       
    } else {
        console.log("cookies not found");
        res.send("cookies not found, Please try re-openning the app.");
    }
});

router.post("/account/verify", (req: Request, res: Response) => {
    tracifiedServices["verifyTracifiedAccount"](req.body.tempToken).then((data: any) => {
        data = JSON.parse(data);
        console.log(data["tracifiedToken"]);
        const tracifiedToken = data["tracifiedToken"];
        const shop = req["session"].shop.name;

        Shop.findOne({ "name": shop }, "name access_token", function (err: Error, installedShop: ShopModel) { //to use if a shop record is alredy there
            if (err) return res.status(503).send("error with db connection. Plese try again in a while");
            if (installedShop) {
                installedShop.tracified_token = tracifiedToken;
                installedShop.save(function () {
                    if (err) return res.status(503).send("error with db connection. Plese try again in a while");
                    return res.redirect("/shopify/main-view");
                });
            }
            else {
                return res.status(401).send("Account Verification Failed. Please try reinstalling the Plugin");
            }
        });
    }).catch(function (err: any) {
        console.error(err);
        return res.status(401).send("Account Verification Failed. Please try again!");
    });
});

router.get("/item-list", (req: Request, res: Response) => {
    tracifiedServices["getTracifiedItemList"](req["session"].shop.tracified_token).then((data: any) => {
        console.log(data);
        res.send(data);
    });
});

router.get("/trace/:orderID/:itemID", (req: Request, res: Response) => {
    const orderID = req.params.orderID;
    const itemID = req.params.itemID;
    console.log(orderID + itemID);
    tracifiedServices["getOrderItemTraceabilityData"](orderID, itemID, req["session"].shop.tracified_token).then((data: any) => {
        console.log(data);
        res.send(data);
    });
});

router.get("/artifacts/:itemID", (req: Request, res: Response) => {
    const itemID = req.params.itemID;
    tracifiedServices["getProductArtifacts"](itemID, req["session"].shop.tracified_token).then((data: any) => {

    });
});

export { router };
