import './app.css'
import { mount } from 'svelte'
import App from './App.svelte'
import { cargarEventos } from './listado'
import { iniciarDetalle } from './detalle'
import { iniciarFormulario } from './formulario'

const app = mount(App, {
  target: document.getElementById('app')!,
})

cargarEventos()
iniciarDetalle()
iniciarFormulario()

export default app

