const socket = io();

socket.on("connect", () => {
  console.log("Conexión exitosa al servidor de socket.io");
});

// Actualizar la vista con el producto nuevo
socket.on("newProduct", (product) => {
  updateViewWithNewProduct(product);
});

function updateViewWithNewProduct(product) {
  const productsContainer = document.getElementById("productContainer");

  // Crea un elemento para el producto nuevo
  const productCard = document.createElement("div");
  productCard.classList.add("card");
  productCard.innerHTML = `
        <img src="${product.data.thumbnail}">
        <div>
        <h3 class="card__title">${product.data.title}</h3>
        <p>Código: ${product.code}</p>
        <p>Precio: $${product.data.price}</p>
        <p>Cantidad: ${product.data.stock}</p>
        </div>
  `;

  // Agrega el nuevo elemento al contenedor de productos
  productsContainer.appendChild(productCard);
}
