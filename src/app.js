const express = require("express");
const { port } = require("./configs/server.configs.js");

const app = express();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
