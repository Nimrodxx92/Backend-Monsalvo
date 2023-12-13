const express = require("express");
const router = express.Router();
const cartManager = require("../cartManager");

router.get("/cart", async (req, res) => {
  try {
    const cartItems = await cartManager.getCartItems();
    res.json({ cartItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity);

    await cartManager.addToCart(productId, quantity);
    res.json({ message: "Producto agregado al carrito correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/cart/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    await cartManager.removeFromCart(productId);
    res.json({ message: "Producto eliminado del carrito correctamente" });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado en el carrito" });
  }
});

module.exports = router;
