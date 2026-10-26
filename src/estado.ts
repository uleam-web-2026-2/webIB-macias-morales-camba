import type { EstadoEvento } from "./tipos";

// Todos los estados, en el orden en que se muestran los botones.
export const ESTADOS: EstadoEvento[] = [
  "cotizacion_registrada", "insumos_comprados", "en_cocina",
  "en_servicio", "finalizado",
];

// La palabra que lee la persona en la pantalla.
export function nombreEstado(estado: EstadoEvento): string {
  if (estado === "cotizacion_registrada") return "Cotización Registrada";
  if (estado === "insumos_comprados") return "Insumos Comprados";
  if (estado === "en_cocina") return "En Cocina";
  if (estado === "en_servicio") return "En Servicio (Evento)";
  return "Finalizado";
}

// Una línea por cada flecha permitida. Lo que no está aquí está prohibido.
export function puedeCambiar(
  actual: EstadoEvento, nuevo: EstadoEvento,
): boolean {
  if (actual === "cotizacion_registrada" && nuevo === "insumos_comprados") return true;
  if (actual === "insumos_comprados" && nuevo === "en_cocina") return true;
  if (actual === "en_cocina" && nuevo === "en_servicio") return true;
  if (actual === "en_servicio" && nuevo === "finalizado") return true;
  return false;
}