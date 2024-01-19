const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 0 },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

class CartManagerDB {
  constructor() {}

  async addCart() {
    try {
      const newCart = await Cart.create({ products: [] });
      console.log("Carrito agregado", newCart);
      return newCart;
    } catch (error) {
      console.error("Error al agregar el carrito: ", error.message);
      throw new Error("Error al agregar el carrito");
    }
  }

  async getCart() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      console.error("Error al obtener los carritos: ", error.message);
      return [];
    }
  }

  async getCartByID(id) {
    try {
      const cart = await Cart.findById(id);
      return cart || null;
    } catch (error) {
      console.error("Error al buscar el carrito: ", error.message);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);

      if (cart) {
        const existingProduct = cart.products.find(
          (prod) => prod.id.toString() === productId
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity });
        }

        await cart.save();
        console.log("Producto agregado", cart);
        return cart;
      } else {
        console.error("Carrito no encontrado");
        return null;
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito: ", error.message);
      throw new Error("Error al agregar el producto al carrito");
    }
  }
}

module.exports = CartManagerDB;
