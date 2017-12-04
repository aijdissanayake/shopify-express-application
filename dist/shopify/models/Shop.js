"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const ShopSchema = new mongoose.Schema({
    name: String,
    access_token: String
});
const Shop = mongoose.model("Shop", ShopSchema);
exports.Shop = Shop;
//# sourceMappingURL=Shop.js.map