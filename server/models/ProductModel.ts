import { Schema, model } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  id: string;
  image: string;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: false,
  },
  id: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
});

const ProductModel = model<IProduct>("Products", ProductSchema);

module.exports = ProductModel;
