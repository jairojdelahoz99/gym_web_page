(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      window.location.href = "login.html";
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (usuario.rol !== "instructor") {
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

    if (usuario.rol === "instructor") {
      nav.innerHTML += `<li><a href="asistencia.html">Asistencia</a></li>`;
      nav.innerHTML += `<li><a href="clases.html">Clases</a></li>`;
    }
  });

  fetch("../json/asistencia.json")
    .then((response) => response.json())
    .then((asistencia) => {
      const tabla = document.getElementById("tablaAsistencia");
      asistencia.forEach((registro) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${registro.usuario}</td><td>${
          registro.clase
        }</td><td>${registro.asistio ? "A" : "F"}</td>`;
        tabla.appendChild(fila);
      });
    });
})();
