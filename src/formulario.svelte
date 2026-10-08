<section aria-labelledby="titulo-nuevo">
  <h2 id="titulo-nuevo">Nuevo Pedido de Catering</h2>
  
  <form action="#" method="post">
    
    <!-- Campo 1: Nombre del Cliente -->
    <label for="nombre-cliente">Nombre del cliente</label>
    <input type="text" id="nombre-cliente" name="nombre_cliente" required>

    <!-- Campo 2: Tipo de Evento -->
    <label for="tipo-evento">Tipo de evento</label>
    <select id="tipo-evento" name="tipo_evento">
      <option>Boda</option>
      <option>Quince años</option>
      <option>Corporativo</option>
    </select>

    <!-- Campo 3: Número de Invitados (Con manejo de error accesible) -->
    <label for="numero-invitados">Número de invitados</label>
    <input type="text" id="numero-invitados" name="numero_invitados" required aria-invalid="true" aria-describedby="invitados-error">
    <p id="invitados-error" class="mensaje-error">Error: Ingrese una cantidad válida de invitados para el banquete.</p>

    <!-- Botón de Envío -->
    <button type="submit">Registrar Cotización</button>

  </form>
</section>