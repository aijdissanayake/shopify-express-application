import * as mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: String,
  access_token: String 
});

type ShopModel = mongoose.Document & {
  name: String,
  access_token: String | null
}

const Shop = mongoose.model("Shop", ShopSchema);
export {Shop, ShopModel};
