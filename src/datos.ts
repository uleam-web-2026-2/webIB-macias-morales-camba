import type { EventoPedido } from "./tipos";

export const eventos: EventoPedido[] = [
  { id: 1040, cliente: "Estefanía Vera", fechaEvento: "2026-12-05",
    tipoEvento: "corporativo", numeroInvitados: 200,
    lugarEntrega: "Centro de convenciones, Manta",
    estado: "cotizacion_registrada" },
  // aquí agregas el evento 1042 (Valeria Zambrano, boda, 150 invitados, estado "en_cocina")
  // y el 1043 (Carlos Mendoza, quince_anos, 80 invitados, estado "insumos_comprados")
];