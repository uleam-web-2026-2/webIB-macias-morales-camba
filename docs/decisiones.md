## El listado usa table y las celdas usan scope
**Elegido:** Una etiqueta `<table>` estructurada con `<thead>`, `<tbody>`, y cabeceras marcadas con `<th scope="col">`.
**Descartado:** Usar una lista (`<ul>`) o contenedores genéricos (`div`) con texto suelto.
**Consecuencia que evita:** Permite que los lectores de pantalla anuncien correctamente el nombre de la columna al leer cada celda (por ejemplo, "Estado: Abierto" en lugar de decir solo "Abierto"), facilitando la comparación de datos tabulares.

## El pie usa footer y la hora usa time
**Elegido:** <footer> con el texto dentro y la marca de tiempo dentro de `<time datetime="2026-09-11T09:40">`.
**Descartado:** Un `<div class="footer">` con el texto corrido.
**Consecuencia que evita:** El `footer` se anuncia como región de pie de página y se puede saltar directamente desde el lector de pantalla; un `div` no. Además, el atributo `datetime` deja la fecha legible por máquinas.