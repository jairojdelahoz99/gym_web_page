(() => {
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
