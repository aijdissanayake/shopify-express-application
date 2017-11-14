const crypto = require('crypto');
const querystring = require('querystring');

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
    }

}