import * as crypto from "crypto";
const querystring = require("querystring");
const request = require("request-promise");

module.exports = {

    verifyQueryHMAC(query: any, apiSecret: string) {
        if (!query.hmac) {
            return false;
        }
        const map = Object.assign({}, query);
        delete map["hmac"];
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac("sha256", apiSecret)
            .update(message)
            .digest("hex");

        return generatedHash !== query.hmac ? false : true;
    },

    verifyPayloadHMAC(data: any, hmac: any , apiSecret: string, next: any){
        data = JSON.stringify(data);
        var digest = crypto.createHmac("SHA256", apiSecret)
        .update(data)
        .digest("base64");
        console.log("digest");
        console.log(digest);
        console.log("hmac");
        console.log(hmac);       
        return digest === hmac? true : false;
    },

    shopAdminAPI(method: string, shop: any, rel_url: string, shopRequestHeaders: any, body: any, callback: Function) {
        var options = {
            method: method,
            uri: "https://" + shop + rel_url,
            headers: shopRequestHeaders,
            body: body,
            json: true
        };
        request(options).then(callback).catch(function (err: Error) {
            return (err);
          });;
    },
}
