const crypto = require('crypto');
const querystring = require('querystring');
const request = require('request-promise');

module.exports = {

    verifyHMAC(query, apiSecret) {
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