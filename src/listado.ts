import { eventos } from "./datos";
import { buscar } from "./dom";
import { ESTADOS, nombreEstado, nombreTipo, puedeCambiar } from "./estado";
import { pedir } from "./supabase";
import type { EstadoEvento, EventoPedido } from "./tipos";
import { mostrarDetalle } from "./detalle";

function celda(texto: string): HTMLTableCellElement {
  const td = document.createElement("td");
  td.textContent = texto;
  return td;
}

// Pide los eventos a Supabase (con su cliente) y pinta la tabla.
export async function cargarEventos(): Promise<void> {
  const aviso = buscar("#aviso-listado");
  aviso.textContent = "Cargando eventos…";
  try {
    const datos = await pedir<EventoPedido[]>(
      "eventos_pedido?select=*,clientes(*)&order=fecha_evento.asc",
    );
    eventos.length = 0;
    eventos.push(...datos);
    pintar();
    aviso.textContent = "";
  } catch {
    aviso.textContent =
      "No se pudieron cargar los eventos. Revise su conexión e intente de nuevo.";
  }
}

// Pinta el listado completo desde el arreglo. Nadie más toca la tabla.
export function pintar(): void {
  const lista = buscar("#lista");
  lista.textContent = "";
  for (const e of eventos) {
    const fila = document.createElement("tr");
    fila.id = "fila-" + e.id;
    fila.appendChild(celda("EV-" + e.id));
    fila.appendChild(celda(e.clientes ? e.clientes.nombre : "—"));
    fila.appendChild(celda(nombreTipo(e.tipo_evento)));
    fila.appendChild(celda(String(e.numero_invitados)));

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
        const botonDetalle = document.createElement("button");
    botonDetalle.type = "button";
    botonDetalle.textContent = "Ver detalle";
    botonDetalle.setAttribute("aria-label", "Ver el detalle del evento " + e.id);
    botonDetalle.addEventListener("click", () => mostrarDetalle(e.id));
    tdAcciones.appendChild(botonDetalle);
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
// y vuelve a pintar. (Por ahora el cambio es solo en pantalla.)
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
  buscar<HTMLButtonElement>("#fila-" + id + " button").focus();
}