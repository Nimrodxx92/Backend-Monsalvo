const ProductManager = require("./ProductManager");

class CartManager {
  constructor() {
    this.cart = [];
  }

  async getCartItems() {
    return this.cart;
  }

  async addToCart(productId, quantity) {
    try {
      const productDetails = await ProductManager.getProductById(productId);

      // Busca si el producto ya está en el carrito
      const existingItem = this.cart.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        existingItem.quantity += quantity;
      } else {
        // Si el producto no está en el carrito lo agrega
        const newItem = {
          productId,
          quantity,
          productDetails,
        };
        this.cart.push(newItem);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      throw new Error("Failed to add to cart");
    }
  }

  async removeFromCart(productId) {
    // Filtra los elementos del carrito, menos el producto a eliminar
    this.cart = this.cart.filter((item) => item.productId !== productId);
  }
}

module.exports = new CartManager();
