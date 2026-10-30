<!-- CAMBIO -->
<script lang="ts">
  import Formulario from './Formulario.svelte';
</script>
<header>
 <h1>Panel de gestión de banquetes y eventos</h1>
 <nav>
   <a href="#">Catálogo</a>
   <a href="#">Cotizaciones y Eventos</a>
 </nav>
</header>

<main>
<section aria-labelledby="titulo-sesion">
    <h2 id="titulo-sesion">Sesión</h2>
    <p id="estado-sesion" role="status">Sin sesión iniciada.</p>
    <form id="form-sesion" novalidate>
      <label for="correo-sesion">Correo</label>
      <input type="email" id="correo-sesion" name="correo" required>
      <label for="clave-sesion">Contraseña</label>
      <input type="password" id="clave-sesion" name="clave" required>
      <button type="submit">Iniciar sesión</button>
    </form>
    <button type="button" id="cerrar-sesion" hidden>Cerrar sesión</button>
  </section>
 <h2>Listado de eventos activos</h2>
 <!-- CAMBIO -->
 <div class="tabla-ancha">
 <table>
   <caption>Seguimiento de estados de eventos y catering en Manabí</caption>
   <thead>
     <tr>
       <th scope="col">ID Evento</th>
       <th scope="col">Cliente</th>
       <th scope="col">Tipo de Evento</th>
       <th scope="col">Invitados</th>
       <th scope="col">Estado</th>
       <!-- CAMBIO -->
       <th scope="col">Cambiar estado</th>
     </tr>
   </thead>
   <!-- CAMBIO -->
     <tbody id="lista"></tbody>
 </table>
 </div>
 <!-- CAMBIO -->
 <p id="aviso-listado" role="status"></p>
   <section id="detalle" aria-labelledby="titulo-detalle" hidden>
    <h2 id="titulo-detalle" tabindex="-1">Detalle del evento</h2>
    <div id="detalle-contenido" role="status"></div>
    <button type="button" id="cerrar-detalle">Cerrar detalle</button>
  </section>
 <Formulario />
</main>