import type { EventoPedido } from "./tipos";

export const eventos: EventoPedido[] = [
  { id: 1040, cliente: "Estefanía Vera", fechaEvento: "2026-12-05",
    tipoEvento: "corporativo", numeroInvitados: 200,
    lugarEntrega: "Centro de convenciones, Manta",
    estado: "cotizacion_registrada" },
    { id: 1042, cliente: "Valeria Zambrano", fechaEvento: "2026-12-15",
    tipoEvento: "boda", numeroInvitados: 150,
    lugarEntrega: "Quinta San Alejo, Portoviejo", estado: "en_cocina" },
  { id: 1043, cliente: "Carlos Mendoza", fechaEvento: "2026-11-20",
    tipoEvento: "quince_anos", numeroInvitados: 80,
    lugarEntrega: "Salón Montecristi", estado: "insumos_comprados" },

];