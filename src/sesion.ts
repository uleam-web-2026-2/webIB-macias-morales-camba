import { buscar } from "./dom";
import { CLAVE_PUBLICA, URL_BASE, ponerToken } from "./supabase";

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
  ponerToken(sesion.access_token);
  return true;
}

export function iniciarPanelSesion(): void {
  const form = buscar<HTMLFormElement>("#form-sesion");
  const estado = buscar("#estado-sesion");
  const cerrar = buscar<HTMLButtonElement>("#cerrar-sesion");

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
      estado.textContent = "Sesión iniciada como " + correo + ".";
      form.reset();
      form.hidden = true;
      cerrar.hidden = false;
    } catch {
      estado.textContent = "No se pudo iniciar sesión. Revise su conexión.";
    }
  });

  cerrar.addEventListener("click", () => {
    ponerToken(null);
    estado.textContent = "Sin sesión iniciada.";
    form.hidden = false;
    cerrar.hidden = true;
  });
}