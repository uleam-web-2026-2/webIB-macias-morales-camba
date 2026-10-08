# Ficha del negocio
# Ficha del negocio: Manabí Catering & Banquetes

## 1. Negocio de referencia
* **Caso de referencia (Starter Story):** Empresa de catering y organización de eventos corporativos y sociales a gran escala (modelo internacional de referencia enfocado en la gestión de menús personalizados y control logístico de eventos).
* **Qué vende y a quién:** Venta de servicios de banquetes, paquetes de platos fuertes, entradas y bocaditos personalizados para clientes organizadores de eventos (bodas, quince años, eventos corporativos).
* **Cómo cobra:** Mediante reservas y anticipos de paquetes de servicios en plataforma.
* **Cifras declaradas:** $55,000 USD mensuales (Periodo fiscal consolidado según el fundador, no auditadas).
* **Fuente:** Caso de referencia de optimización de menús y logística en Starter Story (referencia internacional de catering adaptada al software).

## 2. Contraste obligatorio
* **Negocio comparable que fracasó o se estancó:** Empresas locales tradicionales de catering que operan de forma manual (anotando pedidos en libreta y calculando insumos "al ojo"). 
* **Hipótesis del fracaso:** La falta de un cálculo automatizado de insumos según el número de invitados y la nula trazabilidad de la cadena de temperatura de los alimentos generan mermas elevadas, retrasos en la cocina y pérdida total de contratos por desorganización operativa.

## 3. Adaptación al Ecuador
* **Medios de pago disponibles:** Pasarelas de pago locales seguras y registro de reservas mediante abonos iniciales validados digitalmente en el sistema.
* **Logística y cadena de frío en Manabí:** Las entregas y el montaje de banquetes dependen críticamente de rutas zonales (Manta, Portoviejo, Montecristi) y del control estricto de la cadena de temperatura de los alimentos perecibles.
* **Grado de informalidad y personal operativo:** El sector maneja alta informalidad en la contratación temporal de meseros y chefs; la plataforma estandariza la disponibilidad y asignación de personal calificado por evento para evitar incumplimientos.

## 4. Modelo preliminar
* **Entidades principales (3 entidades):**
  1. **Cliente:** `id` (int), `nombre` (string), `correo` (string), `telefono` (string).
  2. **EventoPedido:** `id` (int), `fecha_evento` (date), `tipo_evento` (string), `numero_invitados` (int), `lugar_entrega` (string), `estado` (string), `total` (float).
  3. **PlatoMenu:** `id` (int), `nombre` (string), `categoria` (string - entrada/plato fuerte/bocadito), `precio_por_persona` (float), `stock_insumos` (int).
* **Relaciones:** `[Cliente]` 1-N `[EventoPedido]` | `[EventoPedido]` N-M `[PlatoMenu]`.
* **Máquina de estados del Pedido:**
  * `Cotización Registrada` ➔ `Insumos Comprados` ➔ `En Cocina` ➔ `En Servicio (Evento)` ➔ `Finalizado`.
  * *Transición prohibida:* No se puede regresar un evento de `Finalizado` a `En Cocina` o `Cotización Registrada` debido a que el servicio ya fue ejecutado y consumido.
* **Roles y Permisos:**
  * **Cliente:** Puede ver el catálogo de menús, filtrar por tipo de evento y registrar un nuevo pedido/cotización de banquete.
  * **Administrador:** Puede ver la lista completa de todos los pedidos, confirmar la compra de insumos, actualizar el estado del evento (cocina, servicio, finalizado) y asignar personal.

## 5. Declaración de IA
* Herramientas de Inteligencia Artificial utilizadas como apoyo estructural y de redacción para la estructuración de la lógica de negocio, flujos de estados logísticos y diseño del modelo relacional adaptado a la rúbrica de la ULEAM.