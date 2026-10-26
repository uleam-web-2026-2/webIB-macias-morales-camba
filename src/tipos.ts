export type EstadoEvento =
  | "cotizacion_registrada"
  | "insumos_comprados"
  | "en_cocina"
  | "en_servicio"
  | "finalizado";

export type TipoEvento = "boda" | "quince_anos" | "corporativo";

export interface EventoPedido {
  id: number;
  cliente: string;
  fechaEvento: string;
  tipoEvento: TipoEvento;
  numeroInvitados: number;
  lugarEntrega: string;
  estado: EstadoEvento;
}