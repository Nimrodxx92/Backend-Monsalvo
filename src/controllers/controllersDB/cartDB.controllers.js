const { Router } = require("express");
const modelCart = require("../../DAO/models/carts.model");
const mongoose = require("mongoose");

const router = Router();

// Ruta para ver el carts de MONGO
router.get("/", async (req, res) => {
  try {
    const cart = await modelCart.find({}, { __v: 0 });
    res.json({
      status: "success",
      payload: cart,
    });
  } catch (error) {
    console.error("No se pudo cargar el carts:", error.message);
    res.status(500).json({
      success: "error",
      error: "Error al procesar la solicitud.",
    });
  }
});

// Crear un nuevo carrito POSTMAN
router.post("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    const newCart = await modelCart.create({ userId, products: [] });
    res.status(201).json({
      success: true,
      payload: "Carrito creado con éxito",
      cart: newCart._id,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Ruta para agregar productos al carrito
router.post("/add-to-cart", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    // Buscar el carrito por userId
    let cart = await modelCart.findOne({ userId });
    // Si no existe, crear uno nuevo
    if (!cart) {
      cart = await modelCart.create({
        _id: new mongoose.Types.ObjectId(),
        userId,
        products: [],
      });
    }
    // Actualizar el carrito con el nuevo producto
    const updatedCart = await modelCart.findByIdAndUpdate(
      cart._id,
      { $push: { products: { _id: productId, quantity: 1 } } },
      { new: true }
    );
    res.json({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Ruta para ver un carrito específico
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await modelCart.findById(cid);
    if (!cart) {
      return res.status(404).render("cartDetails.handlebars", {
        message: "Carrito no encontrado",
      });
    }
    res.render("cartDetails.handlebars", {});
    console.log("Contenido del carrito:", cart);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).render("error.handlebars", {
      message: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Ruta para eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const updatedCart = await modelCart.findByIdAndUpdate(
      cid,
      {
        $pull: { products: { _id: pid } },
      },
      { new: true }
    );
    res.json({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Actualizar el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const updatedCart = await modelCart.findByIdAndUpdate(
      cid,
      { products },
      { new: true }
    );
    res.json({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Actualizar la cantidad de ejemplares de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const updatedCart = await modelCart.findOneAndUpdate(
      { _id: cid, "products._id": pid },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    );
    res.json({
      status: "success",
      payload: updatedCart,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

// Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    await modelCart.findByIdAndUpdate(cid, { products: [] }, { new: true });
    res.json({
      status: "success",
      payload: "Todos los productos del carrito fueron eliminados.",
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor al procesar la solicitud.",
    });
  }
});

module.exports = router;
