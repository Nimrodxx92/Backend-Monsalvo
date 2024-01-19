const fs = require("fs").promises;

class CartManager {
  constructor(path) {
    this.carts = [];
    this.counterId = 1;
    this.path = path;
    this.inMemoryData = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      this.inMemoryData = JSON.parse(await fs.readFile(this.path, "utf-8"));
      this.carts = this.inMemoryData;
      this.counterId = Math.max(...this.carts.map((cart) => cart.id), 0) + 1;
    } catch (error) {
      console.error("Error al leer Archivo", error.message);
    }
  }

  async addCart() {
    const newCart = { id: this.counterId++, products: [] };
    this.carts.push(newCart);

    try {
      await fs.writeFile(
        this.path,
        JSON.stringify(this.carts, null, 2),
        "utf-8"
      );
      console.log("Carrito agregado", newCart);
      return newCart;
    } catch (error) {
      console.error("Error al escribir el archivo: ", error.message);
      throw new Error("Error al escribir el archivo");
    }
  }

  async getCart() {
    try {
      this.carts = await this.inMemoryData;
      return this.carts;
    } catch (error) {
      console.error("Error al leer Archivo", error.message);
      return [];
    }
  }

  async getCartByID(id) {
    try {
      const cartProductsFound = this.carts.find((cart) => cart.id === id);
      return cartProductsFound || null;
    } catch (error) {
      console.error("Error al buscar el producto: ", error.message);
    }
  }

  async addProductToCart(cid, pid, quantity) {
    const cartIndex = this.carts.findIndex((cart) => cart.id === cid);

    if (cartIndex !== -1) {
      const prodExistIndex = this.carts[cartIndex].products.findIndex(
        (prod) => prod.id === pid
      );
      prodExistIndex !== -1
        ? (this.carts[cartIndex].products[prodExistIndex].quantity += quantity)
        : this.carts[cartIndex].products.push({ id: pid, quantity });
    } else {
      console.error("Carrito no encontrado");
      return null;
    }

    try {
      await fs.writeFile(
        this.path,
        JSON.stringify(this.carts, null, 2),
        "utf-8"
      );
      console.log("Producto agregado", this.carts[cartIndex]);
      return this.carts[cartIndex];
    } catch (error) {
      console.error("Error al escribir el archivo: ", error.message);
      throw new Error("Error al escribir el archivo");
    }
  }
}

module.exports = CartManager;
