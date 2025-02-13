(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      window.location.href = "login.html";
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (usuario.rol !== "administrador") {
      alert("No tienes permiso para acceder a esta página.");
      window.location.href = "login.html";
      return;
    }

    // 📌 Mostrar el nombre del usuario en la página
    document.getElementById("nombreUsuario").textContent = usuario.usuario;

    // 🔹 Personalizar menú según el rol
    const nav = document.querySelector("nav ul");
    nav.innerHTML = `<li><a href="contacto.html">Contacto</a></li>
                     <li><a href="clases.html">Clases</a></li>`;

    // 📌 Cargar usuarios
    fetch("../json/usuarios.json")
      .then((response) => response.json())
      .then((data) => {
        let filas = "";
        data.forEach((user) => {
          filas += `<tr><td>${user.usuario}</td><td>${user.rol}</td></tr>`;
        });
        document.getElementById("tablaUsuarios").innerHTML = filas;
      })
      .catch((error) => console.error("Error al cargar usuarios:", error));
  });
})();
