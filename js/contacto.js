(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      window.location.href = "login.html";
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (
      usuario.rol !== "usuario" &&
      usuario.rol !== "administrador" &&
      usuario.rol !== "instructor"
    ) {
      alert("No tienes permiso para acceder a esta página.");
      window.location.href = "perfil.html";
      return;
    }

    // 📌 Mostrar el nombre del usuario en la página
    document.getElementById("nombreUsuario").textContent = usuario.usuario;

    // 🔹 Personalizar menú según el rol
    const nav = document.querySelector("nav ul");

    // Limpiar el menú para evitar duplicados
    nav.innerHTML = "";

    if (usuario.rol === "usuario") {
      nav.innerHTML += `<li><a href="perfil.html">Perfil</a></li>`;
      nav.innerHTML += `<li><a href="calendario.html">Calendario</a></li>`;
    } else if (usuario.rol === "instructor") {
      nav.innerHTML += `<li><a href="perfil.html">Perfil</a></li>`;
      nav.innerHTML += `<li><a href="asistencia.html">Asistencia</a></li>`;
      nav.innerHTML += `<li><a href="clases.html">Clases</a></li>`;
    } else if (usuario.rol === "administrador") {
      nav.innerHTML += `<li><a href="perfil.html">Perfil</a></li>`;
      nav.innerHTML += `<li><a href="dashboard.html">Dashboard</a></li>`;
      nav.innerHTML += `<li><a href="clases.html">Clases</a></li>`;
    }
  });
})();
