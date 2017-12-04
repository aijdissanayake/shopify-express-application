const request = require("request-promise");
const tracifiedURL: string = "https://tracified-mock-api.herokuapp.com";

module.exports = {

    verifyTracifiedAccount(tempToken: string) { },

    getTracifiedItemList: function (tennantID: string, accessToken: string) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                uri: tracifiedURL + "/traceability_data/Data/tracified_item_list/sort-list"
            };

            request(options).then(function (data: any) {
                let type: string = typeof data;
                console.log(type);
                console.log(data);
                resolve(data);
            })
        })
    },

    getOrderTraceabilityData: function (orderID: string, tennantID: string, accessToken: string) {
        return new Promise((resolve, reject) => {
            var options = {
                method: "GET",
                uri: tracifiedURL + "/Traceability_data/Data/tracified_item_list/Odr_001/traceability-profiles"
            };

            request(options).then(function (data: any) {
                let type: string = typeof data;
                console.log(type);
                console.log(data);
                resolve(data);
            })
        })
    }

}