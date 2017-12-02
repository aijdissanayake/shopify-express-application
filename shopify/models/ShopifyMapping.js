const mongoose = require('mongoose');

const ShopifyMapping = mongoose.Schema({
  shop_name: String,
  mapping: Object
});

module.exports = mongoose.model('ShopifyMapping', ShopifyMapping);