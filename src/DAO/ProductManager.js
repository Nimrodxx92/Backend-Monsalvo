const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.productsFile = "./src/products.json"; // Ruta para traer los productos
    this.products = []; // Almacenar los productos cargados
    this.loadProducts(); // Carga los productos al inicializar
  }

  async getProducts(limit) {
    try {
      const allProducts = await this.loadProducts(); // Después de obtener los productos, se verifica el límite
      return limit ? allProducts.slice(0, limit) : allProducts;
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
      throw new Error("No se pudieron obtener los productos");
    }
  }

  async getProductById(productId) {
    try {
      const allProducts = await this.loadProducts(); // Carga los productos y espera a que se ejecute para continuar
      const product = allProducts.find((p) => p.id === productId); // Busca por ID
      if (!product) {
        throw new Error("Producto no encontrado"); // Si no encuentra por ID el producto
      }
      return product; // Si lo encuentra, devuelve el producto
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error.message);
      throw new Error("No se pudo obtener el producto por ID");
    }
  }

  // Función para traer los productos del JSON
  async loadProducts() {
    try {
      const data = await fs.readFile(this.productsFile, "utf-8"); // Leer el contenido del archivo en productsFile
      this.products = JSON.parse(data); // Convierte los datos del JSON en un objeto
      return this.products;
    } catch (error) {
      console.error("Error al cargar productos:", error.message);
      throw new Error("No se pudieron cargar los productos");
    }
  }

  //Guardar la lista de productos en un JSON
  saveProducts() {
    const data = JSON.stringify(this.products, null, 2); //stringify para convertir la lista a una cadena de JSON
    return fs.writeFile(this.productsFile, data, "utf-8"); // writeFile para escribir en productsFile
  }

  // Añadir un nuevo producto a la lista que ya existe y guarda en un archivo
  addProduct(product) {
    const { title, description, price, code, thumbnail, stock } = product; // Destructurando el objeto y verifica cada propiedad
    if (!title || !description || !price || !code || !thumbnail || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }
    const codeExists = this.products.find((product) => product.code === code); // Verifica si ya existe ese código
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
    this.products.push(newProduct); //Agrega el nuevo producto
    const result = this.saveProducts(); // Para guardar la lista actualizada
    if (result) {
      return newProduct;
    }
  }

  //Actualizar un producto que ya existe
  async updateProduct(id, updatedFields) {
    const products = await this.loadProducts();
    const index = products.findIndex((product) => product.id === parseInt(id)); // Buscar el mismo ID
    // Actualiza el producto y que el ID quede igual
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updatedFields,
        id: products[index].id,
      };
      this.saveProducts(); // Llamar a la función para para guarla la lista actualizada
      return true;
    }
    return false;
  }

  async deleteProduct(id) {
    const products = await this.loadProducts();
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index !== -1) {
      products.splice(index, 1);
      this.saveProducts(products);
      return true;
    }
    return false;
  }
}

module.exports = ProductManager;
