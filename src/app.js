const express = require("express");
const { port } = require("./configs/server.configs.js");
const router = require("./router/index.js");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const { createServer } = require("http");
const mongoConnect = require("./db/index.js");
const { Messages } = require("./DAO/models/messages.model.js");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Midlewares
app.use(express.json()); // Transformar JSON a objeto JS
app.use(express.urlencoded({ extended: true })); // Transformar formulario a objeto
app.use(express.static(process.cwd() + "/src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", process.cwd() + "/src/views");
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.send("Bienvenido a mi proyecto");
});

app.use("/", router);

mongoConnect();

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("productAdd", (product) => {
    // Escucha el mensaje del cliente con el producto nuevo
    io.emit("newProduct", product); // Envía el mensaje a todos los clientes para que actualicen
  });

  socket.on("newUser", (user) => {
    io.emit("userConnected", user);
  });

  socket.on("chatMessage", async (message) => {
    io.emit("newChatMessage", message);

    try {
      const newMessage = new Messages({
        user: message.user,
        message: message.message,
      });
      await newMessage.save();
      console.log("Mensaje guardado en MongoDB:", newMessage);
    } catch (error) {
      console.error("Error al guardar el mensaje en MongoDB:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

httpServer.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
