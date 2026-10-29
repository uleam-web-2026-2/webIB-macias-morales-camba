export const URL_BASE ="https://frfuumchapeknvbrgyzt.supabase.co";
export const CLAVE_PUBLICA ="sb_publishable_cNNA0pkfkG6_BjZIVqplQA_ugbKFLCi";


// El token de la sesión. Vale null mientras nadie haya iniciado sesión.
let token: string | null = null;
export function ponerToken(nuevo: string | null): void {
  token = nuevo;
}

// Error que guarda el código con el que respondió Supabase.
export class ErrorSupabase extends Error {
  status: number;
  constructor(status: number) {
    super("Supabase respondió " + status);
    this.status = status;
  }
}

function cabeceras(): Record<string, string> {
  const c: Record<string, string> = { apikey: CLAVE_PUBLICA };
  if (token) {
    c.Authorization = "Bearer " + token;
  }
  return c;
}

// Leer: pide datos a una tabla.
export async function pedir<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${ruta}`, {
    headers: cabeceras(),
  });
  if (!respuesta.ok) {
    throw new ErrorSupabase(respuesta.status);
  }
  return await respuesta.json();
}

// Crear: agrega una fila y devuelve la fila creada.
export async function crear<T>(tabla: string, fila: object): Promise<T> {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${tabla}`, {
    method: "POST",
    headers: {
      ...cabeceras(),
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(fila),
  });
  if (!respuesta.ok) {
    throw new ErrorSupabase(respuesta.status);
  }
  const filas = await respuesta.json();
  return filas[0];
}