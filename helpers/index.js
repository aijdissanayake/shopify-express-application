const crypto = require('crypto');
const querystring = require('querystring');

module.exports = {

    verifyHMAC(query, apiSecret) {
        if (!query.hmac) {
            return false;
        }
        console.log("Helper HMAC verification in progress");
        const map = Object.assign({}, query);
        console.log("signature");
        console.log(map['signature']);
        console.log('hmac');
        console.log(map['hmac']);
        delete map['hmac'];
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex');
        
        console.log('generatedHash');
        console.log(generatedHash);
        
            
        return generatedHash !== query.hmac ? false : true;
    }

}