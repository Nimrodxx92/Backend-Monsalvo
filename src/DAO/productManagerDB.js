const Products = require("../DAO/models/products.model");

class ProductManagerDB {
  async getProducts(limit) {
    try {
      const query = Products.find().lean();
      if (limit) {
        query.limit(limit);
      }
      const allProducts = await query.exec();
      return allProducts;
    } catch (error) {
      console.error("Error al obtener los productos:", error.message);
      throw new Error("No se pudieron obtener los productos");
    }
  }

  async getProductById(productId) {
    try {
      const product = await Products.findById(productId);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por ID:", error.message);
      throw new Error("No se pudo obtener el producto por ID");
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await Products.create(product);
      console.log("Producto agregado", newProduct);
      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto: ", error.message);
      throw new Error("Error al agregar el producto");
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const updatedProduct = await Products.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
      );
      if (updatedProduct) {
        console.log("Producto actualizado", updatedProduct);
        return true;
      } else {
        console.error("Producto no encontrado");
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar el producto: ", error.message);
      throw new Error("Error al actualizar el producto");
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Products.findByIdAndDelete(id);
      if (deletedProduct) {
        console.log("Producto eliminado", deletedProduct);
        return true;
      } else {
        console.error("Producto no encontrado");
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar el producto: ", error.message);
      throw new Error("Error al eliminar el producto");
    }
  }
}

module.exports = ProductManagerDB;
