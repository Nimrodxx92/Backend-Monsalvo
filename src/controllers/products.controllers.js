const { Router } = require("express");
const ProductManager = require("../ProductManager");
const { convertToNumber } = require("../middlewares/conver.numers.middlewares");

const router = Router();
const productManager = new ProductManager("./src/productos.json");

router.get("/", async (req, res) => {
  const { limit } = req.query;

  const products = await productManager.getProducts();

  if (limit) {
    return res.json({ products: products.slice(0, limit) });
  }

  res.json({ products: products });
});

router.get("/:pid", convertToNumber, async (req, res) => {
  const { pid } = req.params;
  try {
    const productId = await productManager.getProductById(pid);
    res.status(200).json({ product: productId });
  } catch (error) {
    res.status(404).json({ Error: error.message });
  }
});

router.post("/", async (req, res) => {
  const product = req.body;

  const productToAdd = await productManager.addProduct(product);

  if (productToAdd) {
    res.json({ productAdded: product });
  } else {
    res.status(404).json({ Error: "Producto no agregado" });
  }
});

router.put("/:pid", convertToNumber, async (req, res) => {
  const { pid } = req.params;
  const dataToUpdate = req.body;

  const productUpdate = await productManager.updateProduct(pid, dataToUpdate);

  if (productUpdate) {
    res.json({ productUpdated: productUpdate });
  } else {
    res.status(404).json({ Error: "Producto no Encontrado" });
  }
});

router.delete("/:pid", convertToNumber, async (req, res) => {
  const { pid } = req.params;

  const productDeleted = await productManager.deleteProduct(pid);

  if (productDeleted) {
    res.json({ message: "Producto Eliminado" });
  } else {
    res.status(404).json({ Error: "Producto no Encontrado" });
  }
});

module.exports = router;
