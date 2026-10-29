import { buscar } from "./dom";
import { nombreEstado, nombreTipo } from "./estado";
import { pedir } from "./supabase";
import type { EventoPedido } from "./tipos";

// Pide UN evento a Supabase, con los datos de su cliente, y lo muestra.
export async function mostrarDetalle(id: number): Promise<void> {
  const seccion = buscar<HTMLElement>("#detalle");
  const contenido = buscar("#detalle-contenido");
  seccion.hidden = false;
  contenido.textContent = "Cargando detalle…";
  try {
    const filas = await pedir<EventoPedido[]>(
      "eventos_pedido?id=eq." + id + "&select=*,clientes(*)",
    );
    const e = filas[0];
    if (!e) {
      contenido.textContent = "El evento " + id + " no existe.";
      return;
    }
    const lineas = [
      "Evento: EV-" + e.id,
      "Estado: " + nombreEstado(e.estado),
      "Tipo de evento: " + nombreTipo(e.tipo_evento),
      "Fecha: " + e.fecha_evento,
      "Invitados: " + e.numero_invitados,
      "Lugar de entrega: " + e.lugar_entrega,
      "Total: $" + Number(e.total).toFixed(2),
      "Cliente: " + (e.clientes ? e.clientes.nombre : "—"),
      "Correo: " + (e.clientes ? e.clientes.correo : "—"),
      "Teléfono: " + (e.clientes ? e.clientes.telefono : "—"),
    ];
    contenido.textContent = "";
    for (const linea of lineas) {
      const p = document.createElement("p");
      p.textContent = linea;
      contenido.appendChild(p);
    }
    buscar<HTMLElement>("#titulo-detalle").focus();
  } catch {
    contenido.textContent =
      "No se pudo cargar el detalle. Revise su conexión e intente de nuevo.";
  }
}

export function iniciarDetalle(): void {
  buscar("#cerrar-detalle").addEventListener("click", () => {
    buscar<HTMLElement>("#detalle").hidden = true;
  });
}