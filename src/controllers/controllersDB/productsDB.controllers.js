const { Router } = require("express");
const ProductsFile = require("../../products.json"); // Para pasar lo del JSON a base MONGO
const modelProduct = require("../../DAO/models/products.model");

const router = Router();

// Ruta con paginación, ordenamiento y filtro
router.get("/", async (req, res) => {
  const { page = 1, sort, category } = req.query;
  const filter = category ? { category } : {};
  const { docs, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } =
    await modelProduct.paginate(filter, {
      page,
      limit: 3,
      sort: { price: sort === "desc" ? -1 : 1 },
      lean: true,
    });
  const Products = docs;
  res.render("home.handlebars", {
    status: "success",
    payload: "Productos cargados con éxito",
    Products,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    prevLink: hasPrevPage
      ? `/productsDB?page=${prevPage}${category ? `&category=${category}` : ""}`
      : null,
    nextLink: hasNextPage
      ? `/productsDB?page=${nextPage}${category ? `&category=${category}` : ""}`
      : null,
  });
});

// Ruta para traer el producto de la base por ID
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await modelProduct.findById(pid).lean().exec();
    res.render("productDetails.handlebars", { product });
  } catch (error) {
    console.error("No existe un producto con ese ID", error.message);
    res.status(404).json({
      status: "error",
      message: "No se encontró el producto con ese ID",
    });
  }
});

// Ruta para mandar mi JSON a la base de MONGO con Postman
router.post("/", async (req, res) => {
  try {
    await modelProduct.insertMany(ProductsFile);
    res.json({ status: "success", payload: "Products loaded" });
  } catch (error) {
    console.error("Error al cargar productos:", error.message);
    res.status(500).json({
      error: "Error interno del servidor",
      message: "No se pudieron cargar los productos",
    });
  }
});

module.exports = router;
