const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const productSchema = new Schema({
  sku: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  creatorId: Number,
  likes: Number,
  categories: Array
});

productSchema.plugin(timestamp);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;