const mongoose = require("mongoose");

const perfumeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Brand",
  },
  price: {
    type: Number,
    requierd: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
    },
  ],
  raiting: {
    type: Number,
    requierd: true,
  },
  discount: {
    type: Number,
    requierd: true,
  },
  is_hit: Boolean,
  is_new: Boolean,
  imageURL: {
    type: String,
    required: true,
  },
});

const Perfume = mongoose.model("Perfume", perfumeSchema);
module.exports = Perfume;
