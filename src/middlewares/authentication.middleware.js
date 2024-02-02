function authentication(req, res, next) {
  try {
    req.session.user ? next() : res.redirect("/login");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(401).json({ error: error });
  }
}

module.exports = authentication;
