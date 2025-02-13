(() => {
  fetch("../json/reservas.json")
    .then((response) => response.json())
    .then((reservas) => {
      const calendario = document.getElementById("calendario");
      reservas.forEach((reserva) => {
        const div = document.createElement("div");
        div.textContent = `${reserva.clase} - ${reserva.fecha}`;
        calendario.appendChild(div);
      });
    });
})();
