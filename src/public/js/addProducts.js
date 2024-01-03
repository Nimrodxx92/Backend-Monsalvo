const socket = io();

function submitForm(e) {
  e.preventDefault();
  const form = document.getElementById("productForm");
  const formData = new FormData(form);
  const product = Object.fromEntries(formData);

  // Solicitud POST utilizando fetch y envía los datos en formato JSON
  fetch("/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then(() => {
      form.reset(); // Limpia el formulario
      socket.emit("productAdd", product); //se envia mensaje al servidro para que al escucharlo avise a todos los clientes y actualicen la vista
      alert("Producto agregado exitosamente");
    })
    .catch((error) => console.error("Error:", error));
}
