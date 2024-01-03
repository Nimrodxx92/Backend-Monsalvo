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
        <img src="${product.thumbnail}">
        <div>
        <h3 class="card__title">${product.title}</h3>
        <p>Código: ${product.code}</p>
        <p>Precio: $${product.price}</p>
        <p>Cantidad: ${product.stock}</p>
        </div>
  `;

  // Agrega el nuevo elemento al contenedor de productos
  productsContainer.appendChild(productCard);
}
