<header>
	<h1>Mesa de Ayuda</h1>
	<nav aria-label="Navegación principal">
		<ul>
			<li><a href="#tickets">Tickets</a></li>
			<li><a href="#clientes">Clientes</a></li>
			<li><a href="#reportes">Reportes</a></li>
		</ul>
	</nav>
	<button type="button">Nuevo ticket</button>
</header>

<main>
	<section aria-labelledby="titulo-vista">
		<h2 id="titulo-vista">Bandeja de tickets</h2>
		<p>Agente: Mariela Zambrano · 6 tickets asignados</p>
	</section>

	<section aria-labelledby="titulo-filtros">
		<h2 id="titulo-filtros">Filtros</h2>
		<p>Estado: [selector] Todos · Abierto · En progreso · En espera · Resuelto · Cerrado</p>
		<p>Prioridad: [selector] Todas · Alta · Media · Baja</p>
		<p>Buscar: [campo de texto] «Asunto o cliente»</p>
		<button type="button">Aplicar filtros</button>
	</section>

	<section aria-labelledby="titulo-resumen">
		<h2 id="titulo-resumen">Resumen</h2>
		<p>Abiertos: 2 · En progreso: 2 · En espera: 1 · Resueltos: 1</p>
	</section>

	<section aria-labelledby="titulo-tabla">
		<h2 id="titulo-tabla">Listado de tickets</h2>
		<table>
			<caption>Listado de solicitudes de soporte asignadas al agente</caption>
			<thead>
				<tr>
					<th scope="col">Nº</th>
					<th scope="col">Asunto</th>
					<th scope="col">Cliente</th>
					<th scope="col">Estado</th>
					<th scope="col">Prioridad</th>
					<th scope="col">Última actualización</th>
					<th scope="col">Acción</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1041</td>
					<td>No puedo iniciar sesión en el portal</td>
					<td>Comercial Vélez</td>
					<td>Abierto</td>
					<td>Alta</td>
					<td>hace 20 min</td>
					<td><a href="#ver-1041">Ver</a></td>
				</tr>
				<tr>
					<td>1038</td>
					<td>La factura electrónica no llega al correo</td>
					<td>Ferretería El Progreso</td>
					<td>En progreso</td>
					<td>Media</td>
					<td>hace 2 h</td>
					<td><a href="#ver-1038">Ver</a></td>
				</tr>
				<tr>
					<td>1035</td>
					<td>Error al exportar el reporte mensual</td>
					<td>Distribuidora Manabí</td>
					<td>En espera</td>
					<td>Media</td>
					<td>ayer</td>
					<td><a href="#ver-1035">Ver</a></td>
				</tr>
				<tr>
					<td>1031</td>
					<td>Solicitud de un usuario adicional</td>
					<td>Clínica San Rafael</td>
					<td>Abierto</td>
					<td>Baja</td>
					<td>ayer</td>
					<td><a href="#ver-1031">Ver</a></td>
				</tr>
				<tr>
					<td>1027</td>
					<td>Lentitud al cargar el inventario</td>
					<td>Comercial Vélez</td>
					<td>En progreso</td>
					<td>Alta</td>
					<td>hace 3 días</td>
					<td><a href="#ver-1027">Ver</a></td>
				</tr>
				<tr>
					<td>1019</td>
					<td>Cambio de RUC en la cuenta</td>
					<td>Panadería Doña Luz</td>
					<td>Resuelto</td>
					<td>Baja</td>
					<td>hace 5 días</td>
					<td><a href="#ver-1019">Ver</a></td>
				</tr>
			</tbody>
		</table>
	</section>
</main>

<footer>
	<p>Mesa de Ayuda · Proyecto docente 2026-2 · Última sincronización: <time datetime="2026-09-11T09:40">hoy, 09:40</time></p>
</footer>