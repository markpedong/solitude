import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },

  image: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
