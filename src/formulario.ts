import { buscar } from "./dom";
import { cargarEventos } from "./listado";
import { crear, ErrorSupabase, pedir } from "./supabase";
import type { Cliente, EventoPedido, TipoEvento } from "./tipos";
import { errorFecha, errorInvitados, errorLugar } from "./validar";

// Revisa un campo y escribe el aviso junto a él.
// Devuelve true si el campo está bien.
function revisar(
  id: string, avisoDelNavegador: string, avisoDelNegocio: string,
): boolean {
  const campo = buscar<HTMLInputElement>("#" + id);
  const aviso = buscar("#" + id + "-error");
  let texto = "";
  if (!campo.checkValidity()) {
    texto = avisoDelNavegador;
  } else {
    texto = avisoDelNegocio;
  }
  aviso.textContent = texto;
  campo.setAttribute("aria-invalid", String(texto !== ""));
  return texto === "";
}

// Llena la lista de clientes con los que hay en Supabase.
async function cargarClientes(): Promise<void> {
  const lista = buscar<HTMLSelectElement>("#cliente");
  try {
    const clientes = await pedir<Cliente[]>("clientes?select=*&order=nombre.asc");
    for (const c of clientes) {
      const opcion = document.createElement("option");
      opcion.value = String(c.id);
      opcion.textContent = c.nombre;
      lista.appendChild(opcion);
    }
  } catch {
    buscar("#mensaje").textContent =
      "No se pudieron cargar los clientes. Recargue la página.";
  }
}

export function iniciarFormulario(): void {
  const form = buscar<HTMLFormElement>("#form-nuevo");
  const mensaje = buscar("#mensaje");
  cargarClientes().then(() => recuperarBorrador(form));
  form.addEventListener("input", () => guardarBorrador(form));

  const CLAVE_BORRADOR = "manabi.borrador";
const CAMPOS = ["cliente", "tipo_evento", "fecha_evento", "invitados", "lugar"];

// Guarda lo que hay escrito. Solo vive en esta pestaña (sessionStorage).
function guardarBorrador(form: HTMLFormElement): void {
  const datos = new FormData(form);
  const borrador: Record<string, string> = {};
  for (const campo of CAMPOS) {
    borrador[campo] = String(datos.get(campo));
  }
  sessionStorage.setItem(CLAVE_BORRADOR, JSON.stringify(borrador));
}

// Lo guardado es texto que cualquiera puede editar: se lee con cuidado.
function recuperarBorrador(form: HTMLFormElement): void {
  const guardado = sessionStorage.getItem(CLAVE_BORRADOR);
  if (guardado === null) return;
  try {
    const borrador = JSON.parse(guardado);
    for (const campo of CAMPOS) {
      const valor = borrador[campo];
      const elemento = form.elements.namedItem(campo);
      if (
        typeof valor === "string" &&
        (elemento instanceof HTMLInputElement ||
          elemento instanceof HTMLSelectElement)
      ) {
        elemento.value = valor;
        // Si la opción guardada ya no existe, el select vuelve a la primera.
        if (elemento instanceof HTMLSelectElement && elemento.value !== valor) {
          elemento.selectedIndex = 0;
        }
      }
    }
  } catch (error) {
    console.error(error);
    sessionStorage.removeItem(CLAVE_BORRADOR);
  }
}

  form.addEventListener("submit", async (evento) => {
    // 1 · Detener el envío: la página no se recarga y lo escrito se conserva.
    evento.preventDefault();

    // 2 · Leer y convertir: del formulario todo llega como texto.
    const datos = new FormData(form);
    const clienteId = Number(datos.get("cliente"));
    const tipoEvento = String(datos.get("tipo_evento")) as TipoEvento;
    const fechaEvento = String(datos.get("fecha_evento"));
    const invitados = Number(datos.get("invitados"));
    const lugar = String(datos.get("lugar")).trim();

    // 3 · Validar campo por campo y avisar junto a cada uno.
    let valido = true;
    if (!revisar("cliente",
      "Error: elija un cliente de la lista.", "")) valido = false;
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

    // 4 · Enviar a Supabase. Si la base lo rechaza, lo escrito se conserva.
    try {
      await crear<EventoPedido>("eventos_pedido", {
        cliente_id: clienteId,
        fecha_evento: fechaEvento,
        tipo_evento: tipoEvento,
        numero_invitados: invitados,
        lugar_entrega: lugar,
      });
    } catch (error) {
      if (error instanceof ErrorSupabase &&
        (error.status === 401 || error.status === 403)) {
        mensaje.textContent =
          "No se registró: debe iniciar sesión para crear un evento.";
      } else {
        mensaje.textContent =
          "No se pudo registrar el evento. Revise su conexión e intente de nuevo.";
      }
      return;
    }

    // 5 · Se creó: se limpia el formulario y se vuelve a pedir el listado.
    form.reset();
      sessionStorage.removeItem(CLAVE_BORRADOR);
    await cargarEventos();
    mensaje.textContent = "Evento registrado. Ya está en el listado.";
  });
}