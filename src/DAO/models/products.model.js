const mongoose = require("mongoose");

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  code: { type: String, unique: true },
  stock: { type: Number },
  status: { type: Boolean },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Products = mongoose.model(productsCollection, productSchema);

module.exports = Products;
