const crypto = require('crypto');

module.exports = {

    verifyHMAC(query, apiSecret) {
        if (!query.hmac) {
            return false;
        }
        console.log("Helper HMAC verification in progress");
        const map = Object.assign({}, query);
        delete map['hmac'];
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex');
        
        return generatedHash !== hmac ? false : true;        
    }

}