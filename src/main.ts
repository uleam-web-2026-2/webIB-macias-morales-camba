import './app.css'
import { mount } from 'svelte'
import App from './App.svelte'
import { pintar } from './listado'
import { iniciarFormulario } from './formulario'

const app = mount(App, {
  target: document.getElementById('app')!,
})

pintar()
iniciarFormulario()

export default app

