(() => {
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
