## Decisión 1 — la tabla en pantalla estrecha
Elegimos la opción 2 (Cada fila se convierte en un bloque con sus datos uno debajo de otro mediante estilos responsivos) porque en pantallas de celulares pequeños (360 píxeles) una tabla con 5 columnas se desborda y deforma la interfaz de control. 
Para el rol de Administrador, la consecuencia es que podrá revisar los eventos y sus estados operativos con un desplazamiento vertical natural y táctil sin sufrir con el zoom horizontal. 
Lo que se pierde es la vista global comparativa de lado a lado de una tabla de escritorio, pero se gana una lectura fluida en campo o desde dispositivos móviles.

## Decisión 2 — Elección de columnas esenciales
Elegimos mostrar estrictamente 5 columnas (ID Evento, Cliente, Tipo de Evento, Invitados y Estado) porque son los datos críticos que el Administrador de catering necesita de un solo vistazo para priorizar la compra de insumos y la preparación en cocina. 
La consecuencia es que la pantalla principal se mantiene limpia y rápida de procesar. 
Lo que se pierde en esta vista general es el detalle de los platos específicos seleccionados o el desglose de los chefs asignados, los cuales requerirán un clic de detalle adicional.

## Semana 10 · dónde vive cada cosa

| Dato | Clase | Dónde vive | Por qué ahí | Qué arriesga |
| --- | --- | --- | --- | --- |
| Su entidad principal (eventos) | Negocio | Supabase (`eventos_pedido`) es la fuente; en el navegador solo hay una copia en memoria (`datos.ts`) | Porque los datos pertenecen al negocio real y deben reflejar la fuente oficial compartida. | Desincronización entre pantallas si otra persona modifica un estado en paralelo, razón por la cual hizo falta implementar la Fase 5. |
| El token | Sesión | `localStorage` (`manabi.sesion`) | Para que la sesión sobreviva aunque se recargue la página o se cierre la pestaña. | Que scripts malintencionados puedan leerlo localmente o que falle si el token vence (probado ingresando un token inválido como `abc.def.ghi`, donde la página no se rompió y mostró correctamente el mensaje de sesión vencida). |
| El filtro | Interfaz | `localStorage` (`manabi.filtro`) | Es una preferencia visual de la usuaria, no un dato crítico, permitiendo recordar la selección al recargar. | Que si se manipula o corrompe, la aplicación simplemente vuelve por defecto a "todos". |
| El borrador | Interfaz | `sessionStorage` (`manabi.borrador`) | Es información efímera que solo sirve mientras se llena el formulario en esa pestaña. | Que al cerrar la pestaña o el navegador se pierda; además, al probarlo se comprobó que una pestaña nueva no lo ve, y no guarda datos sensibles ya que el formulario no maneja contraseñas. |

### La copia vieja

**Opciones que consideramos:**
1. Cambio condicionado en la consulta del PATCH (añadiendo el filtro de estado actual en la URL).
2. Leer la base de datos antes de escribir para validar el estado fresco.
3. Añadir una columna de versión en la base de datos que se incremente en cada actualización.

**La que elegimos y por qué:** 
Elegimos la opción 1 (**Cambio condicionado**), porque Supabase evalúa la condición de manera atómica en el mismo instante en que escribe, evitando cualquier ventana de tiempo donde ocurran conflictos.

**La que descartamos y por qué:** 
Descartamos la opción 2 (Leer antes de escribir) porque deja un pequeño "hueco" de tiempo entre la lectura y el PATCH donde otro usuario podría modificar el estado. También descartamos la opción 3 porque, aunque es la más robusta de todas, exige modificar la estructura de la tabla y resulta más pesada y compleja para la escala de este proyecto.

**Qué pasa ahora en la pantalla de A:** 
Cuando A intenta cambiar un evento que ya fue modificado en otra pantalla, Supabase devuelve cero filas afectadas (`length === 0`). En ese momento se activa `explicarVacio`, la cual vuelve a consultar el evento directamente en Supabase: si el estado actual es diferente, se determina que era una copia vieja, mostrando el aviso de desincronización y actualizando automáticamente la interfaz; por el contrario, si el estado sigue siendo el mismo, se interpreta que el cambio falló por falta de permiso, mostrando el aviso de la Fase 1. Esta validación dual es la razón por la cual siguen funcionando ambos avisos correctamente tal como lo pide el taller.