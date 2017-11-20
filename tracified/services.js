const request = require('request-promise');

module.exports = {

    verifyTracifiedAccount(tempToken) { },

    getTracifiedItemList: function (tennantID, accessToken) {

        return new Promise((resolve, reject) => {

            var options = {
                method: 'GET',
                uri: "https://tracified-mock-api.herokuapp.com/traceability_data/Data/tracified_item_list/sort-list"
            };

            request(options).then(function (data) {
                console.log(data);
                resolve(data);
            })
        })
    },

    getOrderTraceabilityData(orderID, tennantID, accessToken) { }

}