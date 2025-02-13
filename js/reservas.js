(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      window.location.href = "login.html";
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (usuario.rol !== "usuario") {
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

    if (usuario.rol === "usuario") {
      nav.innerHTML += `<li><a href="perfil.html">Perfil</a></li>`;
      nav.innerHTML += `<li><a href="calendario.html">Calendario</a></li>`;
    }

    // 📌 Cargar reservas
    fetch("../json/reservas.json")
      .then((response) => response.json())
      .then((reservas) => {
        const calendario = document.getElementById("calendario");

        reservas.forEach((reserva) => {
          const div = document.createElement("div");
          div.textContent = `${reserva.clase} - ${reserva.fecha} - ${reserva.hora}`;
          calendario.appendChild(div);
        });
      })
      .catch((error) => console.error("Error al cargar reservas:", error));
  });
})();
