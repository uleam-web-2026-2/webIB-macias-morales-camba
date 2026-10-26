// Las reglas del negocio. Cada función recibe el dato ya convertido
// y devuelve el texto del error, o "" si el dato está bien.

export function errorCliente(cliente: string): string {
  if (cliente === "") {
    return "Error: el nombre no puede ser solo espacios. " +
      "Escriba el nombre del cliente.";
  }
  return "";
}

export function errorFecha(fecha: string): string {
  // La fecha de hoy con la misma forma que entrega el campo: "2026-10-26".
  const hoy = new Date().toLocaleDateString("en-CA");
  if (fecha < hoy) {
    return "Error: esa fecha ya pasó. Elija hoy o un día posterior.";
  }
  return "";
}

export function errorInvitados(invitados: number): string {
  if (!Number.isInteger(invitados) || invitados < 1 || invitados > 1000) {
    return "Error: los invitados deben ser un número entero del 1 al 1000.";
  }
  return "";
}

export function errorLugar(lugar: string): string {
  if (lugar === "") {
    return "Error: el lugar no puede ser solo espacios. " +
      "Escriba dónde se entregará el banquete.";
  }
  return "";
}
