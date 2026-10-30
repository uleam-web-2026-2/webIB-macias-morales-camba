# Hito 2 · Manabí Catering & Banquetes
Pareja: Camba Molina Zharick Judith · Macías Macías Lida María · Morales Briones Kristin Ariana
Paralelo: Aplicaciones Web 4 B

## 1 · Tablas

| Tabla | Columnas | Relación |
|---|---|---|
| clientes | id, nombre, correo, telefono | Un cliente registra muchos eventos |
| eventos_pedido | id, cliente_id, fecha_evento, tipo_evento, numero_invitados, lugar_entrega, estado, total, creado_en | Cada evento es de un cliente; un evento incluye varios platos |
| platos_menu | id, nombre, categoria, precio_por_persona, stock_insumos | Un plato está en varios eventos |
| evento_plato | evento_id, plato_id | Une eventos y platos (relación muchos a muchos) |

## 2 · Vista × consulta

| Vista | Qué pide | A qué tabla | Con qué filtro u orden | Qué puede fallar | ¿Funciona ya? |
|---|---|---|---|---|---|
| Gestión de pedidos (listado de eventos) | Leer | eventos_pedido y clientes | Ordenados por fecha del evento, del más próximo al más lejano | Sin red: mensaje en texto | Sí |
| Detalle de un evento | Leer | eventos_pedido y clientes | El evento con ese id y los datos de su cliente | El evento no existe: mensaje | Sí |
| Nuevo pedido (en Mis Cotizaciones) | Crear | eventos_pedido | — | Sin sesión: lo rechaza el servicio | Sí |
| Mis Cotizaciones (vista del cliente) | Leer | eventos_pedido | Solo los eventos del cliente | Cliente sin eventos: lista vacía con mensaje | Plan |
| Catálogo de menús | Leer | platos_menu | Por categoría y precio | Sin red: mensaje en texto | Plan |
| Control de insumos | Leer y cambiar | platos_menu | Platos con poco stock primero | No es administrador: no puede cambiar | Plan |

## 3 · Matriz rol × tabla × operación

| Tabla · operación | Sin sesión | Cliente | Administrador | ¿Política escrita? |
|---|---|---|---|---|
| eventos_pedido · leer | Sí | Sí | Sí | Sí |
| clientes · leer | Sí | Sí | Sí | Sí |
| platos_menu · leer | Sí | Sí | Sí | Sí |
| eventos_pedido · crear | No | Sí (por ahora, cualquier usuario con sesión) | Sí | Sí |
| eventos_pedido · cambiar el estado | No | No | Sí | Diseño |
| platos_menu · actualizar stock | No | No | Sí | Diseño |

## 4 · Usuario de ejemplo

- Correo: <<el correo inventado que creaste en Supabase>>
- Contraseña: <<la contraseña inventada>>

## 5 · Recuadro de cumplimiento

☑ Las tablas existen en Supabase y tienen datos · 
☑ Los tipos de src/tipos.ts tienen las mismas columnas.
☑ El listado y el detalle cargan desde Supabase · 
☑ El formulario valida antes de enviar · 
☑ Sin sesión no se puede crear; con sesión, sí · 
☑ Hay una captura de respaldo de cada demostración

## Declaración de IA

IA: Claude — asistencia en la guía paso a paso del código, el esquema SQL y esta hoja. 