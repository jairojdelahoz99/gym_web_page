const iniciarSesion = () => {
  const formularioLogin = document.getElementById("formLogin");
  const mensajeLogin = document.getElementById("messageLogin");

  if (!formularioLogin) {
    return;
  }

  formularioLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("contraseña").value.trim();

    fetch("../json/usuarios.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el archivo JSON.");
        }
        return response.json();
      })
      .then((usuarios) => {
        const usuarioEncontrado = usuarios.find(
          (user) => user.usuario === usuario && user.password === password
        );

        if (usuarioEncontrado) {
          localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
          mensajeLogin.textContent =
            "Inicio de sesión exitoso. Redirigiendo...";
          mensajeLogin.style.color = "green";

          setTimeout(() => {
            if (usuarioEncontrado.rol === "administrador") {
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
      .catch((error) => {
        console.error("Error al cargar usuarios:", error);
        mensajeLogin.textContent = "Error en el inicio de sesión.";
        mensajeLogin.style.color = "red";
      });
  });
};

iniciarSesion();
