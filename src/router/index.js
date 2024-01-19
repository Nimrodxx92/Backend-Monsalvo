const express = require("express");
const productsController = require("../controllers/products.controllers");
const cartsController = require("../controllers/cart.controllers");
const realTimeProducts = require("../controllers/realTime.controllers");
const addProducts = require("../controllers/addProducts.controllers");
const chat = require("../controllers/chat.controllers");
const productsDBController = require("../controllers/controllersDB/productsDB.controllers");
const cartDBController = require("../controllers/controllersDB/cartDB.controllers");

const router = express.Router();

router.use("/products", productsController);
router.use("/carts", cartsController);
router.use("/realtimeproducts", realTimeProducts);
router.use("/addproducts", addProducts);
router.use("/chat", chat);
router.use("/productsDB", productsDBController);
router.use("/cartDB", cartDBController);

module.exports = router;
