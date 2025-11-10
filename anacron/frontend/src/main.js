import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// Importar componentes
import TurnosList from './components/TurnosList.vue'
import TurnoForm from './components/TurnoForm.vue'
import PacientesList from './components/PacientesList.vue'
import ProfesionalesList from './components/ProfesionalesList.vue'

// Configuración de rutas
const routes = [
  { path: '/', redirect: '/turnos' },
  { path: '/turnos', name: 'Turnos', component: TurnosList },
  { path: '/turnos/nuevo', name: 'NuevoTurno', component: TurnoForm },
  { path: '/turnos/editar/:id', name: 'EditarTurno', component: TurnoForm, props: true },
  { path: '/pacientes', name: 'Pacientes', component: PacientesList },
  { path: '/profesionales', name: 'Profesionales', component: ProfesionalesList }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')