import request = require("request-promise");
const tracifiedURL: string = "https://tracified-mock-api.herokuapp.com";

module.exports = {
    /**
     * this function will verify an Tracified account and connect store with the account
     * normally this will needed to be invoked once per installation
     * @param tempToken - token that will be provided from the tracified-admin
     * a callback url(or to return a promise?) will also need to send
     * and have implemented here to handle te after verification peocess
     */
    verifyTracifiedAccount(tempToken: string) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "POST",
                uri: tracifiedURL + "/account/verify",
            };
            
            request(options).then((data: any) => {
                const type: string = typeof data;
                console.log(type);
                console.log(data);
                resolve(data);
            });
        });
    },

    getTracifiedItemList(accessToken: string) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                uri: tracifiedURL + "/traceability_data/Data/tracified_item_list/sort-list",
            };

            request(options).then((data: any) => {
                const type: string = typeof data;
                console.log(type);
                console.log(data);
                resolve(data);
            });
        });
    },

    getOrderItemTraceabilityData(orderID: string, itemID: string, accessToken: string) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                uri: tracifiedURL + "/Traceability_data/Saaraketha_Process/Details",
            };

            request(options).then((data: any) => {
                const type: string = typeof data;
                console.log(type);
                console.log(data);
                resolve(data);
            });
        });
    },
};
