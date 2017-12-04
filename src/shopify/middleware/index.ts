import { NextFunction, Request, Response, Router } from "express";
const verifyPayloadHMAC = require('../helpers').verifyPayloadHMAC;
const verifyHmac = require('../helpers').verifyHmac;
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

module.exports = {

    verifyWebhook(req: Request, res: Response, next: NextFunction){

        if(req.get('X-Shopify-Hmac-SHA256') && req.body){
            
            if(verifyPayloadHMAC(req.body, req.get('X-Shopify-Hmac-Sha256'), apiSecret)){
                return next();
            }
            return res.status(401).send("Unauthorized Webhook Request! HMAC verification fails");
        }
        return res.status(401).send("Unauthorized Webhook Request! body or HMAC header missing.");
    }
}