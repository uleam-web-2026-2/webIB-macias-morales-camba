export const URL_BASE ="https://frfuumchapeknvbrgyzt.supabase.co";
export const CLAVE_PUBLICA ="sb_publishable_cNNA0pkfkG6_BjZIVqplQA_ugbKFLCi";


const CLAVE_SESION = "manabi.sesion";

export interface SesionGuardada {
  token: string;
  correo: string;
}

// Lo guardado es texto que cualquiera puede editar: se lee con cuidado.
export function leerSesion(): SesionGuardada | null {
  const guardado = localStorage.getItem(CLAVE_SESION);
  if (guardado === null) return null;
  try {
    const dato = JSON.parse(guardado);
    if (typeof dato.token === "string" && typeof dato.correo === "string") {
      return dato;
    }
  } catch (error) {
    console.error(error);
  }
  localStorage.removeItem(CLAVE_SESION);
  return null;
}

export function guardarSesion(sesion: SesionGuardada | null): void {
  if (sesion === null) {
    localStorage.removeItem(CLAVE_SESION);
  } else {
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  }
}

// Error que guarda el código con el que respondió Supabase.
export class ErrorSupabase extends Error {
  status: number;
  constructor(status: number) {
    super("Supabase respondió " + status);
    this.status = status;
  }
}

// Se lanza cuando Supabase responde 401: el token venció o fue alterado.
export class SesionVencida extends Error {}

function cabeceras(): Record<string, string> {
  const c: Record<string, string> = { apikey: CLAVE_PUBLICA };
  const sesion = leerSesion();
  if (sesion !== null) {
    c.Authorization = "Bearer " + sesion.token;
  }
  return c;
}

// Leer: pide datos a una tabla.
export async function pedir<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${URL_BASE}/rest/v1/${ruta}`, {
    headers: cabeceras(),
  });
  if (respuesta.status === 401) {          
    throw new SesionVencida();             
  }                                        
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

// Resultado de un cambio: el código con el que respondió Supabase
// y las filas que realmente cambiaron.
export interface ResultadoCambio<T> {
  codigo: number;
  filas: T[];
}

// Cambiar: modifica una fila. Con "return=representation", Supabase
// devuelve la fila cambiada; si RLS no deja tocarla, devuelve [] (200).
export async function cambiar<T>(
  tabla: string,
  id: number,
  cambios: object,
  condicion = "",
): Promise<ResultadoCambio<T>> {
  const respuesta = await fetch(
    `${URL_BASE}/rest/v1/${tabla}?id=eq.${id}${condicion}`,
    {
      method: "PATCH",
      headers: {
        ...cabeceras(),
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(cambios),
    },
  );
  const filas: T[] = respuesta.ok ? await respuesta.json() : [];
  return { codigo: respuesta.status, filas };
}