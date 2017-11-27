const mongoose = require('mongoose');

const Shop = mongoose.Schema({
  name: String,
  access_token: String
});

module.exports = mongoose.model('Shop', Shop);