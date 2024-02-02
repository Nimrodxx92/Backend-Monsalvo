const authorization = (req, res, next) => {
  try {
    const { user } = req.session;

    if (user && user.role === "admin") {
      req.session.admin = user;
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authorization;
