import * as mongoose from "mongoose";

const ShopifyMappingSchema = new mongoose.Schema({
  shop_name: String,
  mapping: Object
});

type ShopifyMappingModel = mongoose.Document & {
  shop_name: String,
  mapping: Object
}

const ShopifyMapping = mongoose.model("ShopifyMapping", ShopifyMappingSchema);
export {ShopifyMapping, ShopifyMappingModel};
