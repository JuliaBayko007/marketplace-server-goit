const mongoose = require('mongoose');
const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const orderSchema = new Schema({

  productsList: Array,
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  deliveryType: String,
  deliveryAdress: String,
  sumToPay: Number,
  status: String
});

orderSchema.plugin(timestamp);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;