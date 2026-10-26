import { eventos } from "./datos";
import { buscar } from "./dom";
import { pintar } from "./listado";
import type { EventoPedido, TipoEvento } from "./tipos";
import {
  errorCliente, errorFecha, errorInvitados, errorLugar,
} from "./validar";

// Revisa un campo y escribe el aviso junto a él.
// Devuelve true si el campo está bien.
function revisar(
  id: string, avisoDelNavegador: string, avisoDelNegocio: string,
): boolean {
  const campo = buscar<HTMLInputElement>("#" + id);
  const aviso = buscar("#" + id + "-error");
  let texto = "";
  if (!campo.checkValidity()) {
    // Falló una regla que conoce el navegador: required, type, min, max.
    texto = avisoDelNavegador;
  } else {
    // El navegador lo dio por bueno: decide la regla del negocio.
    texto = avisoDelNegocio;
  }
  aviso.textContent = texto;
  campo.setAttribute("aria-invalid", String(texto !== ""));
  return texto === "";
}

export function iniciarFormulario(): void {
  const form = buscar<HTMLFormElement>("#form-nuevo");
  const mensaje = buscar("#mensaje");

  form.addEventListener("submit", (evento) => {
    // 1 · Detener el envío: la página no se recarga y lo escrito se conserva.
    evento.preventDefault();
        // 2 · Leer y convertir: del formulario todo llega como texto.
    const datos = new FormData(form);
    const cliente = String(datos.get("cliente")).trim();
    const tipoEvento = String(datos.get("tipo_evento"));
    const fechaEvento = String(datos.get("fecha_evento"));
    const invitados = Number(datos.get("invitados"));
    const lugar = String(datos.get("lugar")).trim();
     // 3 · Validar campo por campo y avisar junto a cada uno.
    let valido = true;
    if (!revisar("cliente",
      "Error: escriba el nombre del cliente. Es obligatorio.",
      errorCliente(cliente))) valido = false;
    if (!revisar("fecha-evento",
      "Error: elija la fecha del evento. Es obligatoria.",
      errorFecha(fechaEvento))) valido = false;
    if (!revisar("invitados",
      "Error: escriba los invitados con un número entero del 1 al 1000.",
      errorInvitados(invitados))) valido = false;
    if (!revisar("lugar",
      "Error: escriba el lugar de entrega. Es obligatorio.",
      errorLugar(lugar))) valido = false;

        if (!valido) {
      mensaje.textContent = "No se registró. Corrija los campos marcados.";
      buscar<HTMLInputElement>('#form-nuevo [aria-invalid="true"]').focus();
      return;
    }

    // 4 · Todo pasó: primero cambia el dato, después se pinta.
    const nuevo: EventoPedido = {
      id: Math.max(...eventos.map((e) => e.id)) + 1,
      cliente: cliente,
      fechaEvento: fechaEvento,
      tipoEvento: tipoEvento as TipoEvento,
      numeroInvitados: invitados,
      lugarEntrega: lugar,
      estado: "cotizacion_registrada",
    };
    eventos.push(nuevo);
    pintar();
    form.reset();
    mensaje.textContent =
      "Evento EV-" + nuevo.id + " registrado. Ya está en el listado.";
  });
}
