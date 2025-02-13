(() => {
  document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/usuarios.json")
      .then((response) => response.json())
      .then((data) => {
        let filas = "";
        data.usuarios.forEach((user) => {
          //recorer el archivo
          filas += `<tr><td>${user.usuario}</td><td>${user.rol}</td></tr>`; // mostramos el usuario y su rol
        });
        document.getElementById("tablaUsuarios").innerHTML = filas; // ingresamos los datos nuevos
      });
  });
})();
