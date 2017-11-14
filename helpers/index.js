
module.exports = {
    verifyHMAC(query) {
        if (!query.hmac) {
            return false;
        }
        const map = Object.assign({}, query);
        delete map['signature'];
        delete map['hmac'];
        const message = querystring.stringify(map);
        const generatedHash = crypto
            .createHmac('sha256', apiSecret)
            .update(message)
            .digest('hex');
    }
}