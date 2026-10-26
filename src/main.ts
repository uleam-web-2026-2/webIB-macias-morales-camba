import './app.css'
import { mount } from 'svelte'
import App from './App.svelte'
import { pintar } from './listado'

const app = mount(App, {
  target: document.getElementById('app')!,
})

pintar()

export default app

