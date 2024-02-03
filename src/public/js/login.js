const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  const fetchParams = {
    url: "/auth",
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(obj),
  };

  fetch(fetchParams.url, {
    headers: fetchParams.headers,
    method: fetchParams.method,
    body: fetchParams.body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        // Redireccionar a la página de perfil
        window.location.href = data.redirectTo;
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.log(error));
});
