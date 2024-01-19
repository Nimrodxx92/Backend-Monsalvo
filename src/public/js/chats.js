const socket = io();
const chatBox = document.getElementById("chats-box");
const messageLogs = document.getElementById("messages-box");

const getUsername = async () => {
  try {
    const username = await Swal.fire({
      title: "Bienvenido al chat",
      text: "Ingresa tu nombre de usuario",
      input: "text",
    });

    socket.emit("newUser", { user: username.value });

    socket.on("userConnected", (user) => {
      const text = `Se acaba de conectar ${user.user}`;
      Swal.fire({
        icon: "success",
        title: text,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    });

    chatBox.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        const data = { user: username.value, message: chatBox.value };
        chatBox.value = "";
        socket.emit("chatMessage", data);
        console.log("Mensaje enviado al servidor:", data);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const displayMessage = (data) => {
  const message = `${data.user} : ${data.message}`;
  const newMessage = document.createElement("p");
  newMessage.textContent = message;
  messageLogs.appendChild(newMessage);
};

socket.on("newChatMessage", (message) => displayMessage(message));

socket.on("messageLogs", (chats) => updateMessageLogs(chats));

const updateMessageLogs = (chats) => {
  messageLogs.innerHTML = "";
  chats.forEach(displayMessage);
};

getUsername();
