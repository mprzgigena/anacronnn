<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white shadow-card rounded-xl p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-medical-dark">Gestión de Profesionales</h1>
          <p class="mt-2 text-sm text-gray-600">Administra médicos y especialistas</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button 
            @click="mostrarModalProfesional = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo Profesional
          </button>
        </div>
      </div>

      <!-- Filtros -->
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label for="buscar" class="block text-sm font-medium text-gray-700">Buscar</label>
          <input 
            id="buscar"
            type="text" 
            v-model="filtros.buscar"
            @input="aplicarFiltros"
            placeholder="Nombre, apellido, matrícula..."
            class="input-field mt-1"
          />
        </div>
        
        <div>
          <label for="especialidad-filtro" class="block text-sm font-medium text-gray-700">Especialidad</label>
          <select 
            id="especialidad-filtro"
            v-model="filtros.especialidadId"
            @change="aplicarFiltros"
            class="input-field mt-1"
          >
            <option value="">Todas las especialidades</option>
            <option v-for="especialidad in especialidades" :key="especialidad.id" :value="especialidad.id">
              {{ especialidad.nombre }}
            </option>
          </select>
        </div>

        <div>
          <label for="establecimiento-filtro" class="block text-sm font-medium text-gray-700">Establecimiento</label>
          <select 
            id="establecimiento-filtro"
            v-model="filtros.establecimientoId"
            @change="aplicarFiltros"
            class="input-field mt-1"
          >
            <option value="">Todos los establecimientos</option>
            <option v-for="establecimiento in establecimientos" :key="establecimiento.id" :value="establecimiento.id">
              {{ establecimiento.nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="cargando" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary"></div>
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

    <!-- Profesionales Cards -->
    <div v-else-if="profesionalesFiltrados.length > 0" class="space-y-6">
      <div class="bg-white shadow-card rounded-xl p-4">
        <h2 class="text-lg font-medium text-medical-dark mb-4">
          Profesionales Registrados ({{ profesionalesFiltrados.length }})
        </h2>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="profesional in profesionalesFiltrados"
            :key="profesional.id"
            class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <!-- Header del Card -->
            <div class="flex items-center space-x-3 mb-4">
              <div class="flex-shrink-0 h-12 w-12">
                <div class="h-12 w-12 rounded-full bg-medical-secondary flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-medical-dark truncate">
                  Dr. {{ profesional.apellido }}, {{ profesional.nombre }}
                </h3>
                <p class="text-sm text-gray-500">
                  Mat: {{ profesional.matricula }}
                </p>
              </div>
            </div>

            <!-- Información -->
            <div class="space-y-3">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L8 4z"></path>
                </svg>
                <span class="font-medium text-gray-900">
                  {{ getEspecialidadNombre(profesional.especialidad_id) }}
                </span>
              </div>

              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <span class="text-gray-700">
                  {{ getEstablecimientoNombre(profesional.establecimiento_id) }}
                </span>
              </div>

              <div v-if="profesional.telefono" class="flex items-center text-sm">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span class="text-gray-700">{{ profesional.telefono }}</span>
              </div>

              <div v-if="profesional.email" class="flex items-center text-sm">
                <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span class="text-gray-700">{{ profesional.email }}</span>
              </div>
            </div>

            <!-- Acciones -->
            <div class="mt-6 flex space-x-3">
              <button 
                @click="editarProfesional(profesional)"
                class="btn-secondary-sm flex-1 justify-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Editar
              </button>
              
              <router-link 
                :to="`/turnos?profesional=${profesional.id}`"
                class="btn-accent-sm flex-1 justify-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Turnos
              </router-link>
              
              <button 
                @click="confirmarEliminacion(profesional)"
                class="btn-danger-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay profesionales</h3>
      <p class="mt-1 text-sm text-gray-500">Comienza agregando un nuevo profesional médico.</p>
      <div class="mt-6">
        <button @click="mostrarModalProfesional = true" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Nuevo Profesional
        </button>
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
                v-model="formProfesional.especialidad_id"
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
              v-model="formProfesional.establecimiento_id"
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
      especialidad_id: '',
      establecimiento_id: '',
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
          profesional.especialidad_id == filtros.especialidadId
        )
      }

      // Filtro por establecimiento
      if (filtros.establecimientoId) {
        resultado = resultado.filter(profesional => 
          profesional.establecimiento_id == filtros.establecimientoId
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
        especialidad_id: '',
        establecimiento_id: '',
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
        especialidad_id: profesional.especialidad_id || '',
        establecimiento_id: profesional.establecimiento_id || '',
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

        const profesionalData = { ...formProfesional }

        if (modoEdicion.value && profesionalEditando.value) {
          await profesionalesAPI.update(profesionalEditando.value.id, profesionalData)
          
          // Actualizar en la lista local
          const index = profesionales.value.findIndex(p => p.id === profesionalEditando.value.id)
          if (index !== -1) {
            profesionales.value[index] = { ...profesionales.value[index], ...profesionalData }
          }
        } else {
          const nuevoProfesional = await profesionalesAPI.create(profesionalData)
          profesionales.value.push(nuevoProfesional)
        }

        cerrarModal()
      } catch (err) {
        console.error('Error guardando profesional:', err)
        alert('Error al guardar el profesional. Verifica los datos e intenta nuevamente.')
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

    const getEspecialidadNombre = (especialidadId) => {
      if (!especialidadId) return 'Sin especialidad'
      const especialidad = especialidades.value.find(e => e.id == especialidadId)
      return especialidad ? especialidad.nombre : 'Desconocida'
    }

    const getEstablecimientoNombre = (establecimientoId) => {
      if (!establecimientoId) return 'Sin establecimiento'
      const establecimiento = establecimientos.value.find(e => e.id == establecimientoId)
      return establecimiento ? establecimiento.nombre : 'Desconocido'
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
      getEspecialidadNombre,
      getEstablecimientoNombre
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
</style>