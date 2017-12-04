"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ShopifyMappingSchema = new mongoose.Schema({
    shop_name: String,
    mapping: Object
});
const ShopifyMapping = mongoose.model("ShopifyMapping", ShopifyMappingSchema);
exports.ShopifyMapping = ShopifyMapping;
//# sourceMappingURL=ShopifyMapping.js.map