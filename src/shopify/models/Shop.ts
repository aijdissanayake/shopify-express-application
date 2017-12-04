import * as mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({
  name: String,
  access_token: String,
});

type ShopModel = mongoose.Document & {
  name: string,
  access_token: string | null,
};

const Shop = mongoose.model("Shop", ShopSchema);
export {Shop, ShopModel};
