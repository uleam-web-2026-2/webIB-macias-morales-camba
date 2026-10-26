export function buscar<T extends Element>(selector: string): T {
  const elemento = document.querySelector<T>(selector);
  if (!elemento) {
    throw new Error("Falta " + selector + " en el HTML");
  }
  return elemento;
}