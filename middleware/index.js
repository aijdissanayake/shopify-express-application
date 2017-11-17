const verifyPayloadHMAC = require('../helpers').verifyPayloadHMAC;
const verifyHmac = require('../helpers').verifyHmac;
const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";

module.exports = {

    verifyWebhook(req, res, next){

        if(req.get('X-Shopify-Hmac-SHA256') && req.body){

            if(verifyPayloadHMAC(req.body, req.get('X-Shopify-Hmac-Sha256'), apiSecret)){
                return next();
            }
            return res.status(401).send("Unauthorized Webhook Request! HMAC verification fails");
        }

        return res.status(401).send("Unauthorized Webhook Request! body or HMAC header missing.");
    },

    verifyWebhook2(req, res, next) {
        let hmac;
        let data;
        try {
          hmac = req.get('X-Shopify-Hmac-SHA256');
          data = req.body;
        } catch (e) {
          console.log(`Webhook request failed from: ${req.get('X-Shopify-Shop-Domain')}`);
          res.sendStatus(401);
        }
      
        if (verifyHmac(JSON.stringify(data), hmac)) {
          req.topic = req.get('X-Shopify-Topic');
          req.shop = req.get('X-Shopify-Shop-Domain');
          return next();
        }
      
        return res.sendStatus(401);
      }

}