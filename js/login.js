const iniciar = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");
    const mensajeLogin = document.getElementById("mensajeLogin");

    formLogin.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita que la página se recargue

      const usuario = document.getElementById("usuario").value.trim();
      const password = document.getElementById("contraseña").value.trim();
      // traemos los usuarios desde el archivo json
      fetch("../json/usuarios.json")
        .then((response) => response.json())
        .then((usuarios) => {
          const usuarioEncontrado = usuarios.find(
            // buscamos el usuario que coincida con el del archivo json
            (user) => user.usuario === usuario && user.password === password
          );

          if (usuarioEncontrado) {
            // iniciara sesion
            localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
            mensajeLogin.textContent =
              "Inicio de sesión exitoso. Redirigiendo...";
            setTimeout(() => {
              if (usuarioEncontrado.rol === "administrador") {
                // redireccionamos al acseso de su respectivo rol
                window.location.href = "dashboard.html";
              } else if (usuarioEncontrado.rol === "instructor") {
                window.location.href = "asistencia.html";
              } else {
                window.location.href = "calendario.html";
              }
            }, 1000);
          } else {
            mensajeLogin.textContent = "Usuario o contraseña incorrectos.";
            mensajeLogin.style.color = "red";
          }
        })
        .catch((error) => console.error("Error al cargar usuarios:", error));
    });
  });
};
