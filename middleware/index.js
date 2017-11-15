const verifyPayloadHMAC = require('../helpers').verifyPayloadHMAC;
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

module.exports = {

    verifyWebhook(req, res, next){

        if(req.get('X-Shopify-Hmac-SHA256') && req.body){            
            hmac = req.get('X-Shopify-Hmac-SHA256');
            payload = req.body;

            if(verifyPayloadHMAC(payload, apiSecret)){
                return next();
            }

            return res.status(401).send("Unauthorized Webhook Request!");
        }

        return res.status(401).send("Unauthorized Webhook Request!");
    }

}