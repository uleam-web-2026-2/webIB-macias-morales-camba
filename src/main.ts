import './app.css'
import { mount } from 'svelte'
import App from './App.svelte'
import { cargarEventos, iniciarFiltro } from './listado'
import { iniciarDetalle } from './detalle'
import { iniciarFormulario } from './formulario'
import { iniciarPanelSesion } from './sesion'
const app = mount(App, {
  target: document.getElementById('app')!,
})

iniciarFiltro()
cargarEventos()
iniciarDetalle()
iniciarFormulario()
iniciarPanelSesion()

export default app

