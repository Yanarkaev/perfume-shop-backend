const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;
