(() => {
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
