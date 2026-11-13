| Caso | Petición | Código | Cuerpo de la respuesta | Qué mostró la pantalla |
| --- | --- | --- | --- | --- |
| 1 Con sesión y con política | PATCH | 200 | El objeto JSON con la fila modificada devuelta por `return=representation` | El evento pasó al nuevo estado correctamente. |
| 2 Sin sesión | PATCH | 200 | `[]` (devuelve arreglo vacío porque RLS lo bloquea) | Error: el evento no cambió. No tiene permiso. |
| 3 Con sesión y sin política | PATCH | 200 | `[]` (devuelve arreglo vacío porque RLS bloquea la actualización) | Error: el evento no cambió. No tiene permiso. |
| 4 Token alterado, al recargar | GET | 401 | `{"code": 401, "message": "Invalid JWT..."}` | Su sesión venció. Inicie sesión otra vez. |
| 5 Copia vieja, persona A | PATCH | 200 | `[]` (arreglo vacío porque el estado ya no coincide en la base de datos) | Aviso de que el evento ya había cambiado y actualización automática de la vista. |