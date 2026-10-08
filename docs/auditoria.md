# Auditoría de accesibilidad

## 1. Lo que vio la herramienta
- **Antes (listado anterior):** 100 / 100
  - Hallazgos: Ninguno reportado automáticamente por la herramienta.
- **Con el formulario recién agregado (primera pasada):** 95 / 100
  - Hallazgos corregidos: Verificación de etiquetas y áreas táctiles del botón de registro de pedidos.

## 2. Lo que no vio y cómo lo encontramos (mínimo dos)
- **Barrera 1:** El estado del pedido en la tabla se indicaba únicamente con un color de fondo sin texto explícito ni contraste suficiente para personas con daltonismo o debilidad visual.
  - *A quién dejaba afuera:* Usuarios con daltonismo o baja visión que no distinguen variaciones de color verde/amarillo.
  - *Cómo la encontramos:* Leyendo el marcado y evaluando visualmente la celda sin depender del color.

- **Barrera 2:** Falta de asociación directa por atributos de accesibilidad (`aria-describedby`) entre los campos obligatorios del formulario y sus respectivos mensajes de error descriptivos.
  - *A quién dejaba afuera:* Personas que navegan utilizando lectores de pantalla, ya que no recibían la retroalimentación de error al enfocar el campo inválido.
  - *Cómo la encontramos:* Revisando el código fuente y el panel de accesibilidad del navegador.

## 3. Después
- **Puntuación final:** 100 / 100 (Informe guardado en `docs/auditoria_despues.html`)

## 4. La paleta (si cambió)
- **Color de texto de estados / errores:** Ajustado para cumplir con la razón de contraste mínima de 4.5:1 exigida por las normativas WCAG.