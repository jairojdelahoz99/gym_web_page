(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      window.location.href = "login.html";
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (usuario.rol !== "instructor" && usuario.rol !== "administrador") {
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

    // Opción visible para todos
    nav.innerHTML += `<li><a href="contacto.html">Contacto</a></li>`;

    if (usuario.rol === "administrador") {
      nav.innerHTML += `<li><a href="dashboard.html">Dashboard</a></li>`;
    } else if (usuario.rol === "instructor") {
      nav.innerHTML += `<li><a href="asistencia.html">Asistencia</a></li>`;
      nav.innerHTML += `<li><a href="clases.html">Clases</a></li>`;
    }
  });

  fetch("../json/clases.json")
    .then((response) => response.json())
    .then((clases) => {
      const tabla = document.getElementById("tablaClases");
      clases.forEach((clase) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${clase.nombre}</td><td>${clase.instructor}</td><td>${clase.horario}</td>`;
        tabla.appendChild(fila);
      });
    });
})();
