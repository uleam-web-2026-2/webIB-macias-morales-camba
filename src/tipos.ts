export type EstadoEvento =
  | "cotizacion_registrada"
  | "insumos_comprados"
  | "en_cocina"
  | "en_servicio"
  | "finalizado";

export type TipoEvento = "boda" | "quince_anos" | "corporativo";

export type CategoriaPlato = "entrada" | "plato_fuerte" | "bocadito";

export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
}

export interface PlatoMenu {
  id: number;
  nombre: string;
  categoria: CategoriaPlato;
  precio_por_persona: number;
  stock_insumos: number;
}

export interface EventoPedido {
  id: number;
  cliente_id: number;
  fecha_evento: string;
  tipo_evento: TipoEvento;
  numero_invitados: number;
  lugar_entrega: string;
  estado: EstadoEvento;
  total: number;
  creado_en: string;
  // Solo llega cuando se pide con ?select=*,clientes(*) (vista de detalle).
  clientes?: Cliente;
}

export interface EventoPlato {
  evento_id: number;
  plato_id: number;
}