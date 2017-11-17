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

    verifyPayloadHMAC(data, hmac , apiSecret, next){
        data = JSON.stringify(data);
        var digest = crypto.createHmac('SHA256', apiSecret)
        //var digest = crypto.createHmac('SHA256','b90a3f90ec20de99390e7eeca171b4e9d4e9b3eae5c66b3b66862bbc444d78ff')
        .update(data)
        //.update(new Buffer(data, 'utf8'))
        //.update(data)
        .digest('base64');
        console.log("digest");
        console.log(digest);
        console.log("hmac");
        console.log(hmac);       
        return digest === hmac? true : false;
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
    },

    //test
    verifyHmac(data, hmac) {
        data = JSON.parse(data);
        if (!hmac) {
            console.log("no hmac");
          return false;
        } 
        else if (!data || typeof data !== 'object') {
            console.log("no data aor incorrect type");
            console.log(data); 
            console.log(typeof data !== 'object');           
          return false;
        }
        const apiSecret = "d3141aefd842b5857b2048a3a229f4c8";
        const sharedSecret = apiSecret;
        const calculatedSignature = crypto.createHmac('sha256', sharedSecret).update(data).digest('hex');
        console.log("hmac");
        console.log(hmac);
        console.log("calculatedSignature");
        console.log(calculatedSignature);        
        return calculatedSignature === hmac;
      }

}