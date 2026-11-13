import { eventos } from "./datos";
import { buscar } from "./dom";
import { ESTADOS, nombreEstado, nombreTipo, puedeCambiar } from "./estado";
import { SesionVencida, cambiar, pedir } from "./supabase";
import type { EstadoEvento, EventoPedido } from "./tipos";
import { mostrarDetalle } from "./detalle";
import { terminarSesion } from "./sesion";

const CLAVE_FILTRO = "manabi.filtro";
type Filtro = EstadoEvento | "todos";

// Lo guardado se valida antes de usarlo: si no es un valor conocido, "todos".
function leerFiltro(): Filtro {
  const guardado = localStorage.getItem(CLAVE_FILTRO);
  if (guardado === "todos" || ESTADOS.includes(guardado as EstadoEvento)) {
    return guardado as Filtro;
  }
  return "todos";
}

function visibles(): EventoPedido[] {
  const filtro = leerFiltro();
  return eventos.filter((e) => filtro === "todos" || e.estado === filtro);
}

// Dos mensajes distintos: no hay eventos / ninguno coincide con el filtro.
function mensajeVacio(): string {
  if (eventos.length === 0) return "No hay eventos para mostrar.";
  if (visibles().length === 0) return "Ningún evento coincide con el filtro.";
  return "";
}

export function iniciarFiltro(): void {
  const selector = buscar<HTMLSelectElement>("#filtro-estado");
  selector.add(new Option("Todos", "todos"));
  for (const estado of ESTADOS) {
    selector.add(new Option(nombreEstado(estado), estado));
  }
  selector.value = leerFiltro();
  selector.addEventListener("change", () => {
    localStorage.setItem(CLAVE_FILTRO, selector.value);
    pintar();
    buscar("#aviso-listado").textContent = mensajeVacio();
  });
}

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
    aviso.textContent = mensajeVacio();
  } catch (error) {
    if (error instanceof SesionVencida) {
      terminarSesion("Su sesión venció. Inicie sesión otra vez.");
      await cargarEventos();
      return;
    }
    aviso.textContent =
      "No se pudieron cargar los eventos. Revise su conexión e intente de nuevo.";
  }
}

// Pinta el listado completo desde el arreglo. Nadie más toca la tabla.
export function pintar(): void {
  const lista = buscar("#lista");
  lista.textContent = "";
  for (const e of visibles()) {
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

// Un [] puede ser falta de permiso o una copia vieja. Se lee la fuente
// para saber cuál: si el estado de Supabase es otro, la pantalla se pone al día.
async function explicarVacio(
  evento: EventoPedido, aviso: Element,
): Promise<void> {
  try {
    const filas = await pedir<EventoPedido[]>(
      "eventos_pedido?id=eq." + evento.id + "&select=*",
    );
    if (filas.length > 0 && filas[0].estado !== evento.estado) {
      const antes = evento.estado;
      evento.estado = filas[0].estado;
      pintar();
      aviso.textContent = "El evento " + evento.id + " ya había cambiado a «" +
        nombreEstado(filas[0].estado) + "» desde otra pantalla (usted veía «" +
        nombreEstado(antes) + "»). Se actualizó la pantalla; revise y vuelva a intentar.";
      return;
    }
  } catch (error) {
    console.error(error);
  }
  aviso.textContent = "Error: el evento no cambió. No tiene permiso.";
}

// Atiende el clic: primero cambia en Supabase (la fuente) y solo si
// Supabase lo acepta cambia la copia de la pantalla.
async function cambiarEstado(id: number, nuevo: EstadoEvento): Promise<void> {
  const aviso = buscar("#aviso-listado");
  const evento = eventos.find((e) => e.id === id);
  if (!evento) {
    return;
  }
  if (!puedeCambiar(evento.estado, nuevo)) {
    aviso.textContent = "No se puede pasar de «" +
      nombreEstado(evento.estado) + "» a «" + nombreEstado(nuevo) + "».";
    return;
  }

  aviso.textContent = "Guardando…";
  let resultado;
  try {
    resultado = await cambiar<EventoPedido>(
      "eventos_pedido",
      id,
      { estado: nuevo },
      "&estado=eq." + evento.estado,
    );
  } catch (error) {
    console.error(error);
    aviso.textContent = "Error: no hubo respuesta. El evento no cambió.";
    return;
  }
  if (resultado.codigo !== 200) {
    aviso.textContent =
      "Error: el evento no cambió (respondió " + resultado.codigo + ").";
    return;
  }
  if (resultado.filas.length === 0) {
    await explicarVacio(evento, aviso);
    return;
  }

  evento.estado = resultado.filas[0].estado;
  pintar();
  aviso.textContent = "El evento " + id + " pasó a «" + nombreEstado(nuevo) + "».";
  document.querySelector<HTMLButtonElement>("#fila-" + id + " button")?.focus();
}