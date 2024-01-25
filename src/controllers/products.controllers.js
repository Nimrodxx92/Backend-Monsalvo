const { Router } = require("express");
const ProductManager = require("../DAO/ProductManager");
const { convertToNumber } = require("../middlewares/conver.numers.middlewares");
/* const productManager = new ProductManager("./src/productos.json"); */
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    res.render("home.handlebars", { products });
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

router.get("/:pid", convertToNumber, async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(pid);
    res
      .status(product ? 200 : 404)
      .json(
        product
          ? { product }
          : { error: "El producto con el id buscado no existe." }
      );
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    res.status(500).json({
      error: "Error buscar el ID del producto ",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const productAdded = await productManager.addProduct(product);
    res
      .status(productAdded ? 201 : 404)
      .json(
        productAdded
          ? { message: "Producto creado correctamente" }
          : { error: "Producto no agregado" }
      );
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = req.body;
    const productUpdate = await productManager.updateProduct(pid, product);
    res
      .status(productUpdate ? 200 : 404)
      .json(
        productUpdate
          ? { productUpdated: productUpdate }
          : { error: "Producto no Encontrado" }
      );
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    res
      .status(500)
      .json({ error: "Error interno del servidor al actualizar el producto." });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productDeleted = await productManager.deleteProduct(pid);
    res
      .status(productDeleted ? 200 : 404)
      .json(
        productDeleted
          ? { message: "Producto Eliminado" }
          : { error: "Producto no Encontrado" }
      );
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
    res
      .status(500)
      .json({ error: "Error interno del servidor al eliminar el producto." });
  }
});

module.exports = router;
