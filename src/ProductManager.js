const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.productsFile = "./src/products.json";
    this.products = [];
    this.loadProducts(); // Carga los productos al inicializar
  }

  async getProducts(limit) {
    try {
      const allProducts = await this.loadProducts();
      return limit ? allProducts.slice(0, limit) : allProducts;
    } catch (error) {
      console.error("Error getting products:", error.message);
      throw new Error("Failed to get products");
    }
  }

  async getProductById(productId) {
    try {
      const allProducts = await this.loadProducts();
      const product = allProducts.find((p) => p.id === productId);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      console.error("Error getting product by ID:", error.message);
      throw new Error("Failed to get product by ID");
    }
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.productsFile, "utf-8");
      this.products = JSON.parse(data);
      return this.products;
    } catch (error) {
      console.error("Error loading products:", error.message);
      throw new Error("Failed to load products");
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    return fs.writeFile(this.productsFile, data, "utf-8");
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !code || !thumbnail || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const codeExists = this.products.find((product) => product.code === code);
    if (codeExists) {
      console.error("Ya existe un producto con ese código");
      return;
    }

    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.products.length + 1,
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  updateProduct(code, updatedFields) {
    const index = this.products.findIndex((product) => product.code === code);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...updatedFields,
        id: this.products[index].id,
      };
      this.saveProducts();
      return true;
    }
    return false;
  }

  deleteProduct(code) {
    const index = this.products.findIndex((product) => product.code === code);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
