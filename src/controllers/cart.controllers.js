const { Router } = require("express");
const CartManager = require("../DAO/cartManager");
const router = Router();
const cartManager = new CartManager("./src/carrito.json");
const { convertToNumber } = require("../middlewares/conver.numers.middlewares");

// Manejador para crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res
      .status(201)
      .json({ success: true, message: "¡Carrito creado exitosamente!" });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del server al procesar la solicitud.",
    });
  }
});

// Manejador para obtener un producto por ID
router.get("/:cid", convertToNumber, async (req, res) => {
  try {
    const { cid } = req.params;
    const filterById = await cartManager.getCartByID(cid);
    return filterById
      ? res.json({ filterById })
      : res.status(404).json({ error: "No existe el producto con ese ID" });
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    res
      .status(500)
      .json({ error: "Error interno del server al procesar la solicitud" });
  }
});

// Manejador para agregar un producto a un carrito
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartManager.addProductToCart(cid, pid);
    res.status(201).json({ message: "Producto agregado con éxito al carrito" });
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
    res
      .status(500)
      .json({ error: "Error interno del server al procesar la solicitud" });
  }
});

// // En caso de no encontrar ninguna ruta
router.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = router;
