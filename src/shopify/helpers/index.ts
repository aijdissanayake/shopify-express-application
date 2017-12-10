import * as crypto from "crypto";
import querystring = require("querystring");
import request = require("request-promise");

module.exports = {

    verifyQueryHMAC(query: any, apiSecret: string) {
        if (!query.hmac) {
            return false;
        }
        const map = Object.assign({}, query);
        delete map.hmac;
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac("sha256", apiSecret)
            .update(message)
            .digest("hex");

        return generatedHash !== query.hmac ? false : true;
    },

    verifyPayloadHMAC(data: any, hmac: any, apiSecret: string, next: any) {
        data = JSON.stringify(data);
        const digest = crypto.createHmac("SHA256", apiSecret)
        .update(data)
        .digest("base64");
        console.log("digest");
        console.log(digest);
        console.log("hmac");
        console.log(hmac);
        return digest === hmac ? true : false;
    },

    shopAdminAPI(method: string, shop: any, relUrl: string, shopRequestHeaders: any, body: any, callback: () => any) {
        const options = {
            method,
            uri: "https://" + shop + relUrl,
            headers: shopRequestHeaders,
            body,
            json: true,
        };
        console.log("sending request");
        console.log(shopRequestHeaders);
        request(options).then(callback).catch((err: Error) => {
            console.log("admin api error");
            return (err);
          } );
    },
};
