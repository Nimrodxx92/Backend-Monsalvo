const { Router } = require("express");
const authentication = require("../../middlewares/authentication.middleware");
const authorization = require("../../middlewares/authorization.middleware");

const router = Router();

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", authentication, async (req, res) => {
  try {
    const { user } = req.session;
    res.render("profile.handlebars", { user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profileAdmin", authorization, async (req, res) => {
  try {
    const { admin } = req.session;
    res.render("profileAdmin.handlebars", { admin });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
