const request = require("request-promise");
const tracifiedURL = "https://tracified-mock-api.herokuapp.com";
module.exports = {
    verifyTracifiedAccount(tempToken) { },
    getTracifiedItemList: function (tennantID, accessToken) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                uri: tracifiedURL + "/traceability_data/Data/tracified_item_list/sort-list"
            };
            request(options).then(function (data) {
                let type = typeof data;
                console.log(type);
                console.log(data);
                resolve(data);
            });
        });
    },
    getOrderTraceabilityData: function (orderID, tennantID, accessToken) {
        return new Promise((resolve, reject) => {
            var options = {
                method: "GET",
                uri: tracifiedURL + "/Traceability_data/Data/tracified_item_list/Odr_001/traceability-profiles"
            };
            request(options).then(function (data) {
                let type = typeof data;
                console.log(type);
                console.log(data);
                resolve(data);
            });
        });
    }
};
//# sourceMappingURL=services.js.map