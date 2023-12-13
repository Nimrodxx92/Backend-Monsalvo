const express = require("express");
const productsController = require("../controllers/products.controller");
const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.use("/products", productsController);
router.use("/cart", cartController);

module.exports = router;
