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
  constructor() {
    this.products = [];
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !code || !thumbnail || !stock) {
      console.error("Todos los campos son obligatorios"); // Validar que los campos sean obligatorios
      return;
    }

    const codeExists = this.products.find((products) => products.code === code); // Validar no repetir el CODE
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
  }

  getProducts() {
    return this.products;
  }

  getProductsById(code) {
    const product = this.products.find((products) => products.code === code); // Buscar producto por CODE y mostrar error si no lo encuentra
    if (!product) {
      console.error("Producto no encontrado");
    }
    return product;
  }
}

/* PROCESO DE TESTING */
const productManager = new ProductManager(); // Crear instancia
console.log(productManager.getProducts()); // Llamar a getProducts con un arreglo vacío

// Llamar a addProducts
productManager.addProducts(
  "Producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log(productManager.getProducts()); // Mostrar el producto agregado

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
