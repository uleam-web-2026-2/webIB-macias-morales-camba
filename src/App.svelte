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
 <Formulario />
</main>