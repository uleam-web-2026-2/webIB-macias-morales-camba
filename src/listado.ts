import { eventos } from "./datos";
import { buscar } from "./dom";
import { ESTADOS, nombreEstado, puedeCambiar } from "./estado";
import type { EstadoEvento } from "./tipos";

function celda(texto: string): HTMLTableCellElement {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

// Pinta el listado completo desde el arreglo. Nadie más toca la tabla.
export function pintar(): void {
  const lista = buscar("#lista");
  lista.textContent = "";
  for (const e of eventos) {
    const fila = document.createElement("tr");
    fila.id = "fila-" + e.id;
    fila.appendChild(celda("EV-" + e.id));
    fila.appendChild(celda(e.cliente));
    fila.appendChild(celda(e.tipoEvento));
    fila.appendChild(celda(String(e.numeroInvitados)));

    // El estado: el punto de color y, además, la palabra.
    const tdEstado = document.createElement("td");
    const punto = document.createElement("span");
    punto.className = "punto " + e.estado;
    tdEstado.appendChild(punto);
    const palabra = document.createElement("span");
    palabra.textContent = nombreEstado(e.estado);
    tdEstado.appendChild(palabra);
    fila.appendChild(tdEstado);

    // Un botón por cada estado distinto del actual.
    const tdAcciones = document.createElement("td");
    for (const nuevo of ESTADOS) {
      if (nuevo === e.estado) {
        continue;
      }
      const boton = document.createElement("button");
      boton.type = "button";
      boton.textContent = "Pasar a " + nombreEstado(nuevo);
      boton.setAttribute("aria-label",
        "Pasar el evento " + e.id + " a " + nombreEstado(nuevo));
      boton.addEventListener("click", () => cambiarEstado(e.id, nuevo));
      tdAcciones.appendChild(boton);
    }
    fila.appendChild(tdAcciones);

    lista.appendChild(fila);
  }
}

// Atiende el clic: pregunta a la máquina de estados, cambia el dato
// y vuelve a pintar.
function cambiarEstado(id: number, nuevo: EstadoEvento): void {
  const aviso = buscar("#aviso-listado");
  const evento = eventos.find((e) => e.id === id);
  if (!evento) {
    return;
  }
  if (!puedeCambiar(evento.estado, nuevo)) {
    aviso.textContent = "No se puede: el evento " + id + " está en «" +
      nombreEstado(evento.estado) + "» y de ahí no pasa a «" +
      nombreEstado(nuevo) + "».";
    return;
  }
  evento.estado = nuevo;
  pintar();
  aviso.textContent = "El evento " + id + " pasó a «" + nombreEstado(nuevo) + "».";

  // Al pintar, el botón que se pulsó dejó de existir.
  // El foco vuelve a la misma fila.
  buscar<HTMLButtonElement>("#fila-" + id + " button").focus();
}