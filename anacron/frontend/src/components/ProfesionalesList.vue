<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-white via-blue-50 to-white shadow-medical rounded-xl p-4 sm:p-6 border-2 border-blue-200">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center space-x-3 mb-4 sm:mb-0">
          <div class="w-10 h-10 bg-gradient-to-br from-medical-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-xl sm:text-2xl font-bold text-medical-dark">Gestión de Profesionales</h1>
            <p class="text-sm text-gray-600 hidden sm:block">Administra médicos y especialistas</p>
          </div>
        </div>
        <div class="w-full sm:w-auto">
          <button 
            @click="mostrarModalProfesional = true"
            class="w-full sm:w-auto btn-primary inline-flex items-center justify-center px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo Profesional
          </button>
        </div>
      </div>

      <!-- Filtros Responsive -->
      <div class="mt-6 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4">
        <!-- Campo de búsqueda con icono -->
        <div class="relative">
          <label for="buscar" class="block text-sm font-medium text-gray-700 mb-2">
            <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Buscar Profesional
          </label>
          <input 
            id="buscar"
            type="text" 
            v-model="filtros.buscar"
            @input="aplicarFiltros"
            placeholder="Nombre, apellido, matrícula..."
            class="input-field pl-10 w-full transition-all duration-200 focus:ring-2 focus:ring-medical-primary focus:border-medical-primary"
          />
          <div class="absolute inset-y-0 left-0 top-7 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
        
        <!-- Filtro especialidad con icono -->
        <div>
          <label for="especialidad-filtro" class="block text-sm font-medium text-gray-700 mb-2">
            <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L8 4z"></path>
            </svg>
            Especialidad
          </label>
          <select 
            id="especialidad-filtro"
            v-model="filtros.especialidadId"
            @change="aplicarFiltros"
            class="input-field w-full transition-all duration-200 focus:ring-2 focus:ring-medical-primary focus:border-medical-primary"
          >
            <option value="">Todas las especialidades</option>
            <option v-for="especialidad in especialidades" :key="especialidad.id" :value="especialidad.id">
              {{ especialidad.nombre }}
            </option>
          </select>
        </div>

        <!-- Filtro establecimiento con icono -->
        <div>
          <label for="establecimiento-filtro" class="block text-sm font-medium text-gray-700 mb-2">
            <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            Establecimiento
          </label>
          <select 
            id="establecimiento-filtro"
            v-model="filtros.establecimientoId"
            @change="aplicarFiltros"
            class="input-field w-full transition-all duration-200 focus:ring-2 focus:ring-medical-primary focus:border-medical-primary"
          >
            <option value="">Todos los establecimientos</option>
            <option v-for="establecimiento in establecimientos" :key="establecimiento.id" :value="establecimiento.id">
              {{ establecimiento.nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State con animación médica -->
    <div v-if="cargando" class="flex justify-center py-12">
      <div class="text-center space-y-4">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-medical-secondary border-t-medical-primary mx-auto"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg class="w-6 h-6 text-medical-primary animate-pulse-medical" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
        </div>
        <p class="text-medical-primary font-medium animate-bounce-subtle">Cargando profesionales médicos...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
      <div class="flex">
        <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error al cargar profesionales</h3>
          <div class="mt-2 text-sm text-red-700">{{ error }}</div>
        </div>
      </div>
    </div>

    <!-- Profesionales como tabla -->
    <div v-else-if="profesionalesFiltrados.length > 0" class="bg-gradient-to-r from-white to-blue-50 shadow-medical rounded-xl overflow-hidden border-2 border-blue-200">
      <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
        <h2 class="text-xl font-semibold text-medical-dark flex items-center">
          <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Profesionales Registrados
          <span class="ml-2 px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
            {{ profesionalesFiltrados.length }}
          </span>
        </h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Matrícula</th>
              <th class="table-header">Profesional</th>
              <th class="table-header">Especialidades</th>
              <th class="table-header">Establecimiento</th>
              <th class="table-header">Contacto</th>
              <th class="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="profesional in profesionalesFiltrados" :key="profesional.id" class="hover:bg-gray-50">
              <td class="table-cell">
                <div class="text-sm font-medium text-gray-900">
                  {{ profesional.matricula }}
                </div>
              </td>
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-medical-primary flex items-center justify-center">
                      <span class="text-white text-sm font-medium">
                        {{ getIniciales(profesional.nombre, profesional.apellido) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      Dr. {{ profesional.apellido }}, {{ profesional.nombre }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">
                  {{ getProfesionalEspecialidades(profesional) }}
                </span>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">
                  {{ profesional.establecimiento?.nombre || 'Sin establecimiento' }}
                </span>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">
                  <div v-if="profesional.telefono" class="flex items-center">
                    <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <span>{{ profesional.telefono }}</span>
                  </div>
                  <div v-if="profesional.email" class="flex items-center mt-1">
                    <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span class="truncate">{{ profesional.email }}</span>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button 
                    @click="editarProfesional(profesional)"
                    class="btn-secondary-sm"
                    title="Editar profesional"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  
                  <router-link 
                    :to="`/turnos?profesional=${profesional.id}`"
                    class="btn-accent-sm"
                    title="Ver turnos del profesional"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </router-link>
                  
                  <button
                    @click="confirmarEliminacion(profesional)"
                    class="btn-danger-sm"
                    title="Eliminar profesional"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State mejorado -->
    <div v-else class="text-center py-16 animate-fade-in">
      <div class="max-w-md mx-auto">
        <div class="w-24 h-24 bg-gradient-to-br from-medical-primary to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center animate-float">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">No hay profesionales registrados</h3>
        <p class="text-gray-600 mb-8 leading-relaxed">Comienza agregando un nuevo profesional médico al sistema ANACRON.</p>
        <div class="space-y-4">
          <button 
            @click="mostrarModalProfesional = true" 
            class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-medical-primary to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-subtle"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Agregar Primer Profesional
          </button>
          <p class="text-sm text-gray-500">¡Es rápido y fácil!</p>
        </div>
      </div>
    </div>

    <!-- Modal de Profesional -->
    <div v-if="mostrarModalProfesional" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content-large" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ modoEdicion ? 'Editar Profesional' : 'Nuevo Profesional' }}
          </h3>
          <button @click="cerrarModal" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="guardarProfesional" class="modal-body space-y-4">
          <!-- Información Personal -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">
                Nombre *
              </label>
              <input
                id="nombre"
                type="text"
                v-model="formProfesional.nombre"
                required
                class="input-field mt-1"
              />
            </div>
            <div>
              <label for="apellido" class="block text-sm font-medium text-gray-700">
                Apellido *
              </label>
              <input
                id="apellido"
                type="text"
                v-model="formProfesional.apellido"
                required
                class="input-field mt-1"
              />
            </div>
          </div>

          <!-- Información Profesional -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="matricula" class="block text-sm font-medium text-gray-700">
                Matrícula *
              </label>
              <input
                id="matricula"
                type="text"
                v-model="formProfesional.matricula"
                required
                class="input-field mt-1"
              />
            </div>
            <div>
              <label for="especialidad" class="block text-sm font-medium text-gray-700">
                Especialidad *
              </label>
              <select
                id="especialidad"
                v-model="formProfesional.especialidadId"
                required
                class="input-field mt-1"
              >
                <option value="">Selecciona una especialidad</option>
                <option v-for="especialidad in especialidades" :key="especialidad.id" :value="especialidad.id">
                  {{ especialidad.nombre }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label for="establecimiento" class="block text-sm font-medium text-gray-700">
              Establecimiento *
            </label>
            <select
              id="establecimiento"
              v-model="formProfesional.establecimientoId"
              required
              class="input-field mt-1"
            >
              <option value="">Selecciona un establecimiento</option>
              <option v-for="establecimiento in establecimientos" :key="establecimiento.id" :value="establecimiento.id">
                {{ establecimiento.nombre }}
              </option>
            </select>
          </div>

          <!-- Información de Contacto -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="telefono" class="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                id="telefono"
                type="text"
                v-model="formProfesional.telefono"
                class="input-field mt-1"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                v-model="formProfesional.email"
                class="input-field mt-1"
              />
            </div>
          </div>
        </form>
        
        <div class="modal-footer">
          <button @click="cerrarModal" type="button" class="btn-secondary">
            Cancelar
          </button>
          <button @click="guardarProfesional" :disabled="guardando" class="btn-primary">
            <svg v-if="guardando" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ guardando ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear Profesional') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { profesionalesAPI, especialidadesAPI, establecimientosAPI } from '../services/api.js'

export default {
  name: 'ProfesionalesList',
  setup() {
    // Estado reactivo
    const profesionales = ref([])
    const especialidades = ref([])
    const establecimientos = ref([])
    const cargando = ref(true)
    const guardando = ref(false)
    const error = ref(null)
    const mostrarModalProfesional = ref(false)
    const modoEdicion = ref(false)
    const profesionalEditando = ref(null)

    // Filtros
    const filtros = reactive({
      buscar: '',
      especialidadId: '',
      establecimientoId: ''
    })

    // Formulario de profesional
    const formProfesional = reactive({
      nombre: '',
      apellido: '',
      matricula: '',
      especialidadId: '',
      establecimientoId: '',
      telefono: '',
      email: ''
    })

    // Computed properties
    const profesionalesFiltrados = computed(() => {
      let resultado = profesionales.value

      // Filtro de búsqueda
      if (filtros.buscar) {
        const busqueda = filtros.buscar.toLowerCase()
        resultado = resultado.filter(profesional => 
          profesional.nombre?.toLowerCase().includes(busqueda) ||
          profesional.apellido?.toLowerCase().includes(busqueda) ||
          profesional.matricula?.toLowerCase().includes(busqueda)
        )
      }

      // Filtro por especialidad
      if (filtros.especialidadId) {
        resultado = resultado.filter(profesional => 
          profesional.profesionalEspecialidades?.some(pe => pe.especialidadId == filtros.especialidadId)
        )
      }

      // Filtro por establecimiento
      if (filtros.establecimientoId) {
        resultado = resultado.filter(profesional => 
          profesional.establecimientoId == filtros.establecimientoId
        )
      }

      // Ordenar por apellido
      return resultado.sort((a, b) => 
        (a.apellido || '').localeCompare(b.apellido || '')
      )
    })

    // Métodos
    const cargarDatos = async () => {
      try {
        cargando.value = true
        error.value = null

        const [profesionalesData, especialidadesData, establecimientosData] = await Promise.all([
          profesionalesAPI.getAll(),
          especialidadesAPI.getAll(),
          establecimientosAPI.getAll()
        ])

        profesionales.value = profesionalesData
        especialidades.value = especialidadesData
        establecimientos.value = establecimientosData
      } catch (err) {
        error.value = 'No se pudieron cargar los datos. Verifica que el backend esté funcionando.'
        console.error('Error cargando datos:', err)
      } finally {
        cargando.value = false
      }
    }

    const aplicarFiltros = () => {
      // Los filtros se aplican automáticamente mediante computed
    }

    const limpiarFormulario = () => {
      Object.assign(formProfesional, {
        nombre: '',
        apellido: '',
        matricula: '',
        especialidadId: '',
        establecimientoId: '',
        telefono: '',
        email: ''
      })
    }

    const editarProfesional = (profesional) => {
      modoEdicion.value = true
      profesionalEditando.value = profesional
      
      Object.assign(formProfesional, {
        nombre: profesional.nombre || '',
        apellido: profesional.apellido || '',
        matricula: profesional.matricula || '',
        especialidadId: profesional.profesionalEspecialidades?.[0]?.especialidadId || '',
        establecimientoId: profesional.establecimientoId || '',
        telefono: profesional.telefono || '',
        email: profesional.email || ''
      })
      
      mostrarModalProfesional.value = true
    }

    const cerrarModal = () => {
      mostrarModalProfesional.value = false
      modoEdicion.value = false
      profesionalEditando.value = null
      limpiarFormulario()
    }

    const guardarProfesional = async () => {
      try {
        guardando.value = true

        // Validaciones básicas
        if (!formProfesional.nombre.trim()) {
          alert('El nombre es requerido')
          return
        }
        if (!formProfesional.apellido.trim()) {
          alert('El apellido es requerido')
          return
        }
        if (!formProfesional.establecimientoId) {
          alert('El establecimiento es requerido')
          return
        }

        // Preparar datos del profesional con tipos correctos
        const { especialidadId, ...formData } = formProfesional
        const profesionalData = {
          ...formData,
          establecimientoId: parseInt(formData.establecimientoId),
          nombre: formData.nombre.trim(),
          apellido: formData.apellido.trim(),
          matricula: formData.matricula?.trim() || null,
          telefono: formData.telefono?.trim() || null,
          email: formData.email?.trim() || null
        }

        if (modoEdicion.value && profesionalEditando.value) {
          // Actualizar profesional
          await profesionalesAPI.update(profesionalEditando.value.id, profesionalData)
          
          // Si hay especialidad seleccionada, gestionarla por separado
          if (especialidadId) {
            try {
              // Primero remover especialidades existentes (simplificado)
              // Luego asignar la nueva
              const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profesionales/${profesionalEditando.value.id}/especialidades/${parseInt(especialidadId)}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              
              if (!response.ok) {
                console.warn('Error asignando especialidad:', await response.text())
              }
            } catch (error) {
              console.warn('Error asignando especialidad:', error)
            }
          }
        } else {
          // Crear nuevo profesional
          console.log('Enviando datos:', profesionalData)
          const nuevoProfesional = await profesionalesAPI.create(profesionalData)
          
          // Si hay especialidad seleccionada, asignarla
          if (especialidadId && nuevoProfesional.id) {
            try {
              const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/profesionales/${nuevoProfesional.id}/especialidades/${parseInt(especialidadId)}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              
              if (!response.ok) {
                const errorText = await response.text()
                console.warn('Error asignando especialidad:', errorText)
                // No fallar por esto, solo avisar
                alert(`Profesional creado exitosamente, pero hubo un problema asignando la especialidad: ${errorText}`)
              }
            } catch (error) {
              console.warn('Error asignando especialidad:', error)
              alert('Profesional creado exitosamente, pero hubo un problema asignando la especialidad.')
            }
          }
        }

        // Recargar datos para obtener las relaciones correctas
        await cargarDatos()
        cerrarModal()
      } catch (err) {
        console.error('Error guardando profesional:', err)
        let errorMessage = 'Error desconocido'
        
        if (err.message) {
          errorMessage = err.message
        } else if (typeof err === 'string') {
          errorMessage = err
        }
        
        alert(`Error al guardar el profesional: ${errorMessage}. Verifica los datos e intenta nuevamente.`)
      } finally {
        guardando.value = false
      }
    }

    const confirmarEliminacion = (profesional) => {
      if (confirm(`¿Estás seguro de que deseas eliminar al Dr. ${profesional.nombre} ${profesional.apellido}?`)) {
        eliminarProfesional(profesional.id)
      }
    }

    const eliminarProfesional = async (id) => {
      try {
        await profesionalesAPI.delete(id)
        profesionales.value = profesionales.value.filter(p => p.id !== id)
      } catch (err) {
        console.error('Error eliminando profesional:', err)
        alert('Error al eliminar el profesional')
      }
    }

    const getProfesionalEspecialidades = (profesional) => {
      if (!profesional.profesionalEspecialidades || profesional.profesionalEspecialidades.length === 0) {
        return 'Sin especialidad'
      }
      return profesional.profesionalEspecialidades
        .map(pe => pe.especialidad?.nombre)
        .filter(nombre => nombre)
        .join(', ') || 'Sin especialidad'
    }

    const getIniciales = (nombre, apellido) => {
      const inicial1 = nombre ? nombre.charAt(0).toUpperCase() : ''
      const inicial2 = apellido ? apellido.charAt(0).toUpperCase() : ''
      return inicial1 + inicial2
    }

    // Cargar datos al montar
    onMounted(cargarDatos)

    return {
      // Estado
      profesionales,
      especialidades,
      establecimientos,
      cargando,
      guardando,
      error,
      mostrarModalProfesional,
      modoEdicion,
      filtros,
      formProfesional,
      
      // Computed
      profesionalesFiltrados,
      
      // Métodos
      cargarDatos,
      aplicarFiltros,
      editarProfesional,
      cerrarModal,
      guardarProfesional,
      confirmarEliminacion,
      eliminarProfesional,
      getProfesionalEspecialidades,
      getIniciales
    }
  }
}
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-primary transition-colors duration-200;
}

.btn-secondary-sm {
  @apply inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200;
}

.btn-accent-sm {
  @apply inline-flex items-center px-3 py-1.5 border border-green-300 rounded text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors duration-200;
}

.btn-danger-sm {
  @apply inline-flex items-center p-1 border border-red-300 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200;
}

.table-header {
  @apply px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-cell {
  @apply px-6 py-6 text-sm text-gray-900;
}

.input-field {
  @apply block w-full border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary sm:text-sm;
}

.modal-overlay {
  @apply fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center;
}

.modal-content-large {
  @apply bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto;
}

.modal-header {
  @apply px-6 py-4 border-b border-gray-200 flex items-center justify-between;
}

.modal-title {
  @apply text-lg font-medium text-gray-900;
}

.modal-close {
  @apply text-gray-400 hover:text-gray-600 transition-colors duration-200;
}

.modal-body {
  @apply px-6 py-4 max-h-96 overflow-y-auto;
}

.modal-footer {
  @apply px-6 py-4 border-t border-gray-200 flex justify-end space-x-3;
}

/* Nuevos estilos modernos para cards */
.btn-edit-modern {
  @apply inline-flex items-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105;
}

.btn-turnos-modern {
  @apply inline-flex items-center px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800 border border-green-200 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105;
}

.btn-delete-modern {
  @apply p-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 rounded-lg transition-all duration-200 transform hover:scale-110;
}

.card-info-badge {
  @apply inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200;
}

.card-info-badge-green {
  @apply bg-green-50 text-green-800 border border-green-200;
}

.card-info-badge-blue {
  @apply bg-blue-50 text-blue-800 border border-blue-200;
}

.card-info-badge-gray {
  @apply bg-gray-50 text-gray-700 border border-gray-200;
}
</style>