const fs = require("fs").promises;

class CartManager {
  constructor(path) {
    this.carts = []; // Para almacenar los carritos de compras
    this.counterId = 1; // Para asignar identificadores únicos a los carritos
    this.path = path; // Indica la ubicación del archivo donde se almacenarán los datos relacionados con los carritos
    this.loadCarts(); // Carga los datos existentes de los carritos desde el archivo especificado en path
  }

  async loadCarts() {
    try {
      const cartToAdd = JSON.parse(await fs.readFile(this.path, "utf-8"));
      this.carts = cartToAdd;
      this.counterId = Math.max(...this.carts.map((cart) => cart.id), 0) + 1;
    } catch (error) {
      console.log("Error al leer Archivo", error.message);
    }
  }

  async addCart() {
    const newCart = {
      id: this.counterId++,
      products: [],
    };

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
      console.log("Error al escribir el archivo: ", error.message);
    }
  }
  async getCart() {
    try {
      const dataRead = JSON.parse(await fs.readFile(this.path, "utf-8"));
      this.carts = dataRead;
      return dataRead;
    } catch (error) {
      console.log("Error al leer Archivo", error.message);
      return [];
    }
  }
  async getCartProductsById(id) {
    try {
      const dataRead = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const cartProductsFound = dataRead.find((cart) => cart.id === id);
      if (cartProductsFound) {
        return cartProductsFound;
      } else {
        console.error("Carrito no encontrado");
        return null;
      }
    } catch (error) {
      console.log("Error al buscar el producto: ", error.message);
    }
  }
  async addProductToCart(cid, pid) {
    const cartExist = this.carts.find((cart) => cart.id === cid);
    const cartIndex = this.carts.findIndex((cart) => cart.id === cid);

    if (cartExist) {
      const prodExist = cartExist.products.find((prod) => prod.id === pid);
      if (prodExist) {
        prodExist.quantity += quantity;
      } else {
        this.carts[cartIndex].products.push({
          id: pid,
          quantity: quantity,
        });
      }
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
      console.log("Producto agregado", cartExist);
      return cartExist;
    } catch (error) {
      console.log("Error al escribir el archivo: ", error.message);
    }
  }
}

module.exports = CartManager;
