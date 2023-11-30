const fs = require("fs");

class Products {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts(); // Carga los productos al inicializar
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !code || !thumbnail || !stock) {
      console.error("Todos los campos son obligatorios"); // Validar que los campos sean obligatorios
      return;
    }

    const codeExists = this.products.find((product) => product.code === code); // Validar no repetir el CODE
    if (codeExists) {
      console.error("Ya existe un producto con ese código");
      return;
    }

    const newProduct = new Products(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    newProduct.id = this.products.length + 1; // Crear producto con el ID incrementado

    this.products.push(newProduct); // Agregar el producto al arreglo
    this.saveProducts(); // Guardar productos en el archivo
  }

  getProducts() {
    return this.products;
  }

  getProductsById(code) {
    const product = this.products.find((product) => product.code === code); // Buscar producto por CODE y mostrar error si no lo encuentra
    if (!product) {
      console.error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(code, updatedFields) {
    // Recibir el id del producto a actualizar sin borrarlo
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
    // Recibir un ID y eliminar el producto que tenga ese código
    const index = this.products.findIndex((product) => product.code === code);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
      return true;
    }
    return false;
  }
}

/* PROCESO DE TESTING */
const productManager = new ProductManager("products.json");
console.log("Productos al inicio:", productManager.getProducts()); // Llamar a getProducts con un arreglo vacío

// Llamar a addProducts
productManager.addProducts(
  "Producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log("Productos después de agregar uno:", productManager.getProducts()); // Mostrar el producto agregado

// Llamar a addProducts con los mismos campos para que tire un error
productManager.addProducts(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// Llamar a getProductsById con un CODE que no existe para que tire un error
const productIdToFind = "xyz456";
const foundProduct = productManager.getProductsById(productIdToFind);
console.log("Producto encontrado:", foundProduct);

// Llamar a updateProduct para cambiar un campo de algún producto
const productToUpdateCode = "abc123";
const updateSuccess = productManager.updateProduct(productToUpdateCode, {
  price: 250,
});
console.log("Actualización exitosa:", updateSuccess);

// Llamar a deleteProduct para eliminar un producto
const productToDeleteCode = "abc123";
const deleteSuccess = productManager.deleteProduct(productToDeleteCode);
console.log("Eliminación exitosa:", deleteSuccess);

// Mostrar los productos después de la eliminación
console.log(
  "Productos después de la eliminación:",
  productManager.getProducts()
);
