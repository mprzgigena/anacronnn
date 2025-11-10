<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white shadow-card rounded-xl p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-medical-dark">Gestión de Turnos</h1>
          <p class="mt-2 text-sm text-gray-600">Administra citas médicas y consultas</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <router-link 
            to="/turnos/nuevo"
            class="btn-primary"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo Turno
          </router-link>
        </div>
      </div>

      <!-- Filtros -->
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label for="fecha-filtro" class="block text-sm font-medium text-gray-700">Fecha</label>
          <input 
            id="fecha-filtro"
            type="date" 
            v-model="filtros.fecha"
            @change="aplicarFiltros"
            class="input-field mt-1"
          />
        </div>
        
        <div>
          <label for="estado-filtro" class="block text-sm font-medium text-gray-700">Estado</label>
          <select 
            id="estado-filtro"
            v-model="filtros.estado"
            @change="aplicarFiltros"
            class="input-field mt-1"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="confirmado">Confirmado</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
            <option value="no_asistio">No Asistió</option>
          </select>
        </div>

        <div>
          <label for="profesional-filtro" class="block text-sm font-medium text-gray-700">Profesional</label>
          <select 
            id="profesional-filtro"
            v-model="filtros.profesionalId"
            @change="aplicarFiltros"
            class="input-field mt-1"
          >
            <option value="">Todos los profesionales</option>
            <option v-for="prof in profesionales" :key="prof.id" :value="prof.id">
              Dr. {{ prof.nombre }} {{ prof.apellido }}
            </option>
          </select>
        </div>

        <div>
          <label for="buscar" class="block text-sm font-medium text-gray-700">Buscar</label>
          <input 
            id="buscar"
            type="text" 
            v-model="filtros.buscar"
            @input="aplicarFiltros"
            placeholder="DNI, nombre, apellido..."
            class="input-field mt-1"
          />
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
          <h3 class="text-sm font-medium text-red-800">Error al cargar turnos</h3>
          <div class="mt-2 text-sm text-red-700">{{ error }}</div>
        </div>
      </div>
    </div>

    <!-- Turnos List -->
    <div v-else-if="turnosFiltrados.length > 0" class="bg-white shadow-card rounded-xl overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-medical-dark">
          Turnos Programados ({{ turnosFiltrados.length }})
        </h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">Fecha</th>
              <th class="table-header">Hora</th>
              <th class="table-header">Paciente</th>
              <th class="table-header">Profesional</th>
              <th class="table-header">Especialidad</th>
              <th class="table-header">Estado</th>
              <th class="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="turno in turnosFiltrados" :key="turno.id" class="hover:bg-gray-50">
              <td class="table-cell">
                {{ formatDate(turno.fecha) }}
              </td>
              <td class="table-cell">
                {{ formatTime(turno.hora) }}
              </td>
              <td class="table-cell">
                <div>
                  <div class="text-sm font-medium text-gray-900">
                    {{ turno.paciente?.nombre }} {{ turno.paciente?.apellido }}
                  </div>
                  <div class="text-sm text-gray-500">DNI: {{ turno.paciente?.dni }}</div>
                </div>
              </td>
              <td class="table-cell">
                <div>
                  <div class="text-sm font-medium text-gray-900">
                    Dr. {{ turno.profesional?.nombre }} {{ turno.profesional?.apellido }}
                  </div>
                  <div class="text-sm text-gray-500">
                    Mat. {{ turno.profesional?.matricula }}
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">
                  {{ turno.profesional?.especialidad?.nombre }}
                </span>
              </td>
              <td class="table-cell">
                <span :class="getEstadoBadgeClass(turno.estado)" class="badge">
                  {{ capitalize(turno.estado) }}
                </span>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <router-link 
                    :to="`/turnos/editar/${turno.id}`"
                    class="btn-secondary-sm"
                    title="Editar turno"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </router-link>
                  
                  <button 
                    @click="cambiarEstado(turno)"
                    class="btn-accent-sm"
                    title="Cambiar estado"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                  
                  <button 
                    @click="confirmarEliminacion(turno)"
                    class="btn-danger-sm"
                    title="Eliminar turno"
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

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay turnos</h3>
      <p class="mt-1 text-sm text-gray-500">Comienza creando un nuevo turno médico.</p>
      <div class="mt-6">
        <router-link to="/turnos/nuevo" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Nuevo Turno
        </router-link>
      </div>
    </div>

    <!-- Modal de Cambio de Estado -->
    <div v-if="mostrarModalEstado" class="modal-overlay" @click="cerrarModalEstado">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Cambiar Estado del Turno</h3>
          <button @click="cerrarModalEstado" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <p class="text-sm text-gray-600 mb-4">
            Selecciona el nuevo estado para el turno de {{ turnoSeleccionado?.paciente?.nombre }}
          </p>
          
          <div class="space-y-3">
            <label v-for="estado in estadosDisponibles" :key="estado.valor" class="flex items-center">
              <input 
                type="radio" 
                :value="estado.valor" 
                v-model="nuevoEstado"
                class="form-radio text-medical-primary focus:ring-medical-primary"
              />
              <span class="ml-3 text-sm font-medium text-gray-700">{{ estado.etiqueta }}</span>
            </label>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="cerrarModalEstado" class="btn-secondary">Cancelar</button>
          <button @click="actualizarEstado" class="btn-primary">Actualizar Estado</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { turnosAPI, profesionalesAPI, utils } from '../services/api.js'

export default {
  name: 'TurnosList',
  setup() {
    // Estado reactivo
    const turnos = ref([])
    const profesionales = ref([])
    const cargando = ref(true)
    const error = ref(null)
    const mostrarModalEstado = ref(false)
    const turnoSeleccionado = ref(null)
    const nuevoEstado = ref('')

    // Filtros
    const filtros = reactive({
      fecha: '',
      estado: '',
      profesionalId: '',
      buscar: ''
    })

    // Estados disponibles para el modal
    const estadosDisponibles = [
      { valor: 'pendiente', etiqueta: 'Pendiente' },
      { valor: 'confirmado', etiqueta: 'Confirmado' },
      { valor: 'completado', etiqueta: 'Completado' },
      { valor: 'cancelado', etiqueta: 'Cancelado' },
      { valor: 'no_asistio', etiqueta: 'No Asistió' }
    ]

    // Computed properties
    const turnosFiltrados = computed(() => {
      let resultado = turnos.value

      // Filtro por fecha
      if (filtros.fecha) {
        resultado = resultado.filter(turno => 
          turno.fecha === filtros.fecha
        )
      }

      // Filtro por estado
      if (filtros.estado) {
        resultado = resultado.filter(turno => 
          turno.estado === filtros.estado
        )
      }

      // Filtro por profesional
      if (filtros.profesionalId) {
        resultado = resultado.filter(turno => 
          turno.profesional_id == filtros.profesionalId
        )
      }

      // Filtro de búsqueda
      if (filtros.buscar) {
        const busqueda = filtros.buscar.toLowerCase()
        resultado = resultado.filter(turno => {
          const paciente = turno.paciente
          if (!paciente) return false
          
          return paciente.dni?.includes(busqueda) ||
                 paciente.nombre?.toLowerCase().includes(busqueda) ||
                 paciente.apellido?.toLowerCase().includes(busqueda)
        })
      }

      // Ordenar por fecha y hora
      return resultado.sort((a, b) => {
        const fechaA = new Date(a.fecha + ' ' + (a.hora || '00:00'))
        const fechaB = new Date(b.fecha + ' ' + (b.hora || '00:00'))
        return fechaA - fechaB
      })
    })

    // Métodos
    const cargarDatos = async () => {
      try {
        cargando.value = true
        error.value = null

        // Cargar turnos y profesionales en paralelo
        const [turnosData, profesionalesData] = await Promise.all([
          turnosAPI.getAll(),
          profesionalesAPI.getAll()
        ])

        turnos.value = turnosData
        profesionales.value = profesionalesData
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

    const cambiarEstado = (turno) => {
      turnoSeleccionado.value = turno
      nuevoEstado.value = turno.estado
      mostrarModalEstado.value = true
    }

    const cerrarModalEstado = () => {
      mostrarModalEstado.value = false
      turnoSeleccionado.value = null
      nuevoEstado.value = ''
    }

    const actualizarEstado = async () => {
      if (!turnoSeleccionado.value || !nuevoEstado.value) return

      try {
        await turnosAPI.update(turnoSeleccionado.value.id, {
          estado: nuevoEstado.value
        })

        // Actualizar el estado localmente
        const index = turnos.value.findIndex(t => t.id === turnoSeleccionado.value.id)
        if (index !== -1) {
          turnos.value[index].estado = nuevoEstado.value
        }

        cerrarModalEstado()
      } catch (err) {
        console.error('Error actualizando estado:', err)
        alert('Error al actualizar el estado del turno')
      }
    }

    const confirmarEliminacion = (turno) => {
      if (confirm(`¿Estás seguro de que deseas eliminar el turno de ${turno.paciente?.nombre} ${turno.paciente?.apellido}?`)) {
        eliminarTurno(turno.id)
      }
    }

    const eliminarTurno = async (id) => {
      try {
        await turnosAPI.delete(id)
        turnos.value = turnos.value.filter(t => t.id !== id)
      } catch (err) {
        console.error('Error eliminando turno:', err)
        alert('Error al eliminar el turno')
      }
    }

    const getEstadoBadgeClass = (estado) => {
      const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
      const estadoClasses = {
        'pendiente': 'bg-yellow-100 text-yellow-800',
        'confirmado': 'bg-green-100 text-green-800',
        'completado': 'bg-blue-100 text-blue-800',
        'cancelado': 'bg-red-100 text-red-800',
        'no_asistio': 'bg-gray-100 text-gray-800'
      }
      return `${baseClasses} ${estadoClasses[estado] || estadoClasses.pendiente}`
    }

    // Utilidades importadas
    const { formatDate, formatTime, capitalize } = utils

    // Cargar datos al montar el componente
    onMounted(cargarDatos)

    return {
      // Estado
      turnos,
      profesionales,
      cargando,
      error,
      mostrarModalEstado,
      turnoSeleccionado,
      nuevoEstado,
      filtros,
      estadosDisponibles,
      
      // Computed
      turnosFiltrados,
      
      // Métodos
      cargarDatos,
      aplicarFiltros,
      cambiarEstado,
      cerrarModalEstado,
      actualizarEstado,
      confirmarEliminacion,
      eliminarTurno,
      getEstadoBadgeClass,
      
      // Utilidades
      formatDate,
      formatTime,
      capitalize
    }
  }
}
</script>

<style scoped>
/* Botones principales */
.btn-primary {
  @apply inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-medical-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-primary transition-colors duration-200;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-primary transition-colors duration-200;
}

/* Botones pequeños */
.btn-secondary-sm {
  @apply inline-flex items-center p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200;
}

.btn-accent-sm {
  @apply inline-flex items-center p-1 border border-green-300 rounded text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-200;
}

.btn-danger-sm {
  @apply inline-flex items-center p-1 border border-red-300 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200;
}

/* Campos de entrada */
.input-field {
  @apply block w-full border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary sm:text-sm;
}

/* Tabla */
.table-header {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
}

.badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

/* Modal */
.modal-overlay {
  @apply fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center;
}

.modal-content {
  @apply bg-white rounded-lg shadow-xl max-w-md w-full mx-4;
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
  @apply px-6 py-4;
}

.modal-footer {
  @apply px-6 py-4 border-t border-gray-200 flex justify-end space-x-3;
}
</style>