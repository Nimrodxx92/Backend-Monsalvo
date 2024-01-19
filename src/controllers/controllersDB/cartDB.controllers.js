const express = require("express");
const router = express.Router();
const CartManagerDB = require("../../DAO/cartManagerDB");

const cartManagerDB = new CartManagerDB();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const newCart = await cartManagerDB.addCart();
    res.status(201).json({ success: true, cart: newCart });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Obtener un carrito por ID
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManagerDB.getCartByID(cid);
    return cart
      ? res.json({ cart })
      : res.status(404).json({ error: "No existe el carrito con ese ID." });
  } catch (error) {
    console.error("Error al obtener el carrito:", error.message);
    res
      .status(500)
      .json({ error: "Error interno del servidor al procesar la solicitud." });
  }
});

// Agregar un producto a un carrito
router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartManagerDB.addProductToCart(cid, pid);
    res
      .status(201)
      .json({ message: "Producto agregado con éxito al carrito." });
  } catch (error) {
    console.error("Error al agregar productos al carrito:", error.message);
    res
      .status(500)
      .json({ error: "Error interno del servidor al procesar la solicitud." });
  }
});

// En caso de no encontrar ninguna ruta
router.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

module.exports = router;
