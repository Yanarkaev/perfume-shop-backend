const mongoose = require("mongoose");

const phoneNumberSchema = mongoose.Schema({
  phoneNumber: string,
});

const phoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);
module.exports = phoneNumber;
