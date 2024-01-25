const mongoose = require("mongoose");

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

cartSchema.pre("find", function () {
  this.populate("products.product");
});
cartSchema.pre("findOne", function () {
  this.populate("products.product");
});
cartSchema.pre("findByIdAndUpdate", function () {
  this.populate("products.product");
});

const Carts = mongoose.model(cartCollection, cartSchema);

module.exports = Carts;
