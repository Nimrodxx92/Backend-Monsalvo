const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", () => {
  fetch("/auth/logout")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "/login";
    })
    .catch((error) => console.log(error));
});
