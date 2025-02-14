() => {
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

    // Limpiar el menú para evitar duplicados
    nav.innerHTML = "";

    // Opción visible para todos
    nav.innerHTML += `<li><a href="contacto.html">Contacto</a></li>`;

    if (usuario.rol === "administrador") {
      nav.innerHTML += `<li><a href="clases.html">Clases</a></li>`;
    }

    fetch("../json/usuarios.json")
      .then((response) => response.json())
      .then((usuarios) => {
        const tabla = document.getElementById("tablaUsuarios");
        usuarios.forEach((usuario) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `<td>${usuario.usuario}</td><td>${usuario.rol}</td>`;
          tabla.appendChild(fila);
        });
      });
  })();
};
