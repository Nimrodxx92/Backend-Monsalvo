const Users = require("../../DAO/models/user.model");
const { Router } = require("express");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    return !user || user.password !== password
      ? res.status(400).json({ message: "Bad Request" })
      : (req.session.user = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        }) && res.json({ status: "success", message: "Login Successful" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    return req.session.destroy((err) => {
      return err
        ? res.status(500).json({ error: "Internal Server Error" })
        : res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
