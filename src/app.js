const express = require("express");
const { port } = require("./configs/server.configs.js");
const router = require("./router/index.js");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("Bienvenido a mi proyecto");
});

app.use("/", router);

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
