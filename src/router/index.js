const express = require("express");
const productsController = require("../controllers/products.controllers");
const cartsController = require("../controllers/cart.controllers");
const realTimeProducts = require("../controllers/realTime.controllers");
const addProducts = require("../controllers/addProducts.controllers");

const router = express.Router();

router.use("/products", productsController);
router.use("/carts", cartsController);
router.use("/realtimeproducts", realTimeProducts);
router.use("/addproducts", addProducts);

module.exports = router;
