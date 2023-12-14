const express = require("express");
const { port } = require("./configs/server.configs.js");
const router = require("./router/index.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Hola, esta es la página de inicio!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
