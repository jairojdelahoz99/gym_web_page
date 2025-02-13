(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      window.location.href = "login.html";
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);
    document.getElementById("nombreUsuario").textContent = usuario.usuario;
    document.getElementById("edadUsuario").textContent = usuario.edad;

    // 🔹 Personalizar menú según el rol
    const nav = document.querySelector("nav ul");

    // Limpiar el menú para evitar duplicados
    nav.innerHTML = "";

    // Opción visible para todos
    nav.innerHTML += `<li><a href="contacto.html">Contacto</a></li>`;

    if (usuario.rol === "usuario") {
      nav.innerHTML += `<li><a href="calendario.html">Calendario</a></li>`;
    } else if (usuario.rol === "instructor") {
      nav.innerHTML += `<li><a href="asistencia.html">Asistencia</a></li>`;
      nav.innerHTML += `<li><a href="clases.html">Clases</a></li>`;
    } else if (usuario.rol === "administrador") {
      nav.innerHTML += `<li><a href="dashboard.html">Dashboard</a></li>`;
      nav.innerHTML += `<li><a href="clases.html">Clases</a></li>`;
    }
  });
})();
