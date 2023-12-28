function submitForm() {
  const form = document.getElementById("productForm");
  const formData = new FormData(form);

  // Solicitud POST utilizando fetch y envía los datos en formato JSON
  fetch("/products", {
    method: "POST",
    headers: {},
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => response.json())
    .then(() => {
      form.reset(); // Limpia el formulario
      alert("Producto agregado exitosamente");
    })
    .catch((error) => console.error("Error:", error));
}
