const express = require("express");
const productsController = require("../controllers/products.controllers");
const cartsController = require("../controllers/cart.controllers");

const router = express.Router();

router.use("/products", productsController);
router.use("/carts", cartsController);

module.exports = router;
