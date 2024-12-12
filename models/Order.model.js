const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  cartData: Array,
  clientName: String,
  phoneNumber: String,
  city: String,
  address: String,
  total: Number,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
