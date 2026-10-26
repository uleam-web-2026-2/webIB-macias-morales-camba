<section aria-labelledby="titulo-nuevo">
  <h2 id="titulo-nuevo">Nuevo Pedido de Catering</h2>

  <form id="form-nuevo" action="#" method="post" novalidate>
    <label for="cliente">Nombre del cliente</label>
    <input type="text" id="cliente" name="cliente" required
      aria-describedby="cliente-error">
    <p id="cliente-error" class="mensaje-error"></p>

    <label for="tipo-evento">Tipo de evento</label>
    <select id="tipo-evento" name="tipo_evento" required>
      <option value="boda">Boda</option>
      <option value="quince_anos">Quince años</option>
      <option value="corporativo">Corporativo</option>
    </select>

    <label for="fecha-evento">Fecha del evento</label>
    <input type="date" id="fecha-evento" name="fecha_evento" required
      aria-describedby="fecha-evento-error">
    <p id="fecha-evento-error" class="mensaje-error"></p>

    <label for="invitados">Número de invitados (1 a 1000)</label>
    <input type="number" id="invitados" name="invitados" required
      min="1" max="1000" aria-describedby="invitados-error">
    <p id="invitados-error" class="mensaje-error"></p>

    <label for="lugar">Lugar de entrega</label>
    <input type="text" id="lugar" name="lugar" required
      aria-describedby="lugar-error">
    <p id="lugar-error" class="mensaje-error"></p>

    <button type="submit">Registrar Cotización</button>
  </form>

  <p id="mensaje" role="status"></p>
</section>