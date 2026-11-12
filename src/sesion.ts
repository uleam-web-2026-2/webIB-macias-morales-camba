import { buscar } from "./dom";
import { CLAVE_PUBLICA, URL_BASE, guardarSesion, leerSesion } from "./supabase";

function mostrarConSesion(correo: string): void {
  buscar<HTMLFormElement>("#form-sesion").hidden = true;
  buscar<HTMLButtonElement>("#cerrar-sesion").hidden = false;
  buscar("#estado-sesion").textContent = "Sesión iniciada como " + correo + ".";
}

// Olvida el token y deja la pantalla como sin sesión.
export function terminarSesion(mensaje: string): void {
  guardarSesion(null);
  buscar<HTMLFormElement>("#form-sesion").hidden = false;
  buscar<HTMLButtonElement>("#cerrar-sesion").hidden = true;
  buscar("#estado-sesion").textContent = mensaje;
}

// Pide el token a Supabase. Devuelve false si el correo o la contraseña no sirven.
async function iniciarSesion(email: string, password: string): Promise<boolean> {
  const respuesta = await fetch(`${URL_BASE}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: CLAVE_PUBLICA, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!respuesta.ok) {
    return false;
  }
  const sesion = await respuesta.json();
  guardarSesion({ token: sesion.access_token, correo: sesion.user.email });
  return true;
}

export function iniciarPanelSesion(): void {
  const form = buscar<HTMLFormElement>("#form-sesion");
  const cerrar = buscar<HTMLButtonElement>("#cerrar-sesion");
  const estado = buscar("#estado-sesion");

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const datos = new FormData(form);
    const correo = String(datos.get("correo")).trim();
    const clave = String(datos.get("clave"));
    if (correo === "" || clave === "") {
      estado.textContent = "Escriba su correo y su contraseña.";
      return;
    }
    try {
      const entro = await iniciarSesion(correo, clave);
      if (!entro) {
        estado.textContent = "Correo o contraseña incorrectos.";
        return;
      }
      form.reset();
      mostrarConSesion(correo);
      cerrar.focus();
    } catch {
      estado.textContent = "No se pudo iniciar sesión. Revise su conexión.";
    }
  });

  // Al abrir la página: si había una sesión guardada, la pantalla la refleja.
  const guardada = leerSesion();
  if (guardada !== null) {
    mostrarConSesion(guardada.correo);
  }

  cerrar.addEventListener("click", () => {
    terminarSesion("Sin sesión iniciada.");
    buscar<HTMLInputElement>("#sesion-correo").focus();
  });
}