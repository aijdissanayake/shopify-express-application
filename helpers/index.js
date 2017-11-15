const crypto = require('crypto');
const querystring = require('querystring');
const request = require('request-promise');

module.exports = {

    verifyQueryHMAC(query, apiSecret) {
        if (!query.hmac) {
            return false;
        }
        const map = Object.assign({}, query);
        delete map['hmac'];
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex');

        return generatedHash !== query.hmac ? false : true;
    },

    verifyPayloadHMAC(reqBody, apiSecret){
        var digest = crypto.createHmac('SHA256', apiSecret)
        .update(new Buffer(reqBody, 'utf8'))
        .digest('base64');

        return digest === req.headers['X-Shopify-Hmac-Sha256'] ? true : false;
    },

    shopAdminAPI(method, shop, rel_url, shopRequestHeaders, body, callback) {
        var options = {
            method: method,
            uri: 'https://' + shop + rel_url,
            headers: shopRequestHeaders,
            body: body,
            json: true
        };
        request(options).then(callback).catch(function (err) {
            return (err);
          });;
    }

}