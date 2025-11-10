<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="bg-white shadow-card rounded-xl p-6">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-medical-dark">Gestión de Pacientes</h1>
          <p class="mt-2 text-sm text-gray-600">Administra la información de los pacientes</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button 
            @click="mostrarModalPaciente = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo Paciente
          </button>
        </div>
      </div>

      <!-- Filtros y Búsqueda -->
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="sm:col-span-2">
          <label for="buscar" class="block text-sm font-medium text-gray-700">Buscar</label>
          <input 
            id="buscar"
            type="text" 
            v-model="filtros.buscar"
            @input="aplicarFiltros"
            placeholder="DNI, nombre, apellido, teléfono..."
            class="input-field mt-1"
          />
        </div>
        
        <div>
          <label for="obra-social-filtro" class="block text-sm font-medium text-gray-700">Obra Social</label>
          <select 
            id="obra-social-filtro"
            v-model="filtros.obraSocialId"
            @change="aplicarFiltros"
            class="input-field mt-1"
          >
            <option value="">Todas las obras sociales</option>
            <option v-for="obra in obrasSociales" :key="obra.id" :value="obra.id">
              {{ obra.nombre }}
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
          <h3 class="text-sm font-medium text-red-800">Error al cargar pacientes</h3>
          <div class="mt-2 text-sm text-red-700">{{ error }}</div>
        </div>
      </div>
    </div>

    <!-- Pacientes Grid/List -->
    <div v-else-if="pacientesFiltrados.length > 0" class="bg-white shadow-card rounded-xl overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-medical-dark">
          Pacientes Registrados ({{ pacientesFiltrados.length }})
        </h2>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="table-header">DNI</th>
              <th class="table-header">Paciente</th>
              <th class="table-header">Fecha de Nacimiento</th>
              <th class="table-header">Contacto</th>
              <th class="table-header">Obra Social</th>
              <th class="table-header">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="paciente in pacientesFiltrados" :key="paciente.id" class="hover:bg-gray-50">
              <td class="table-cell">
                <div class="text-sm font-medium text-gray-900">
                  {{ paciente.dni }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ getEdad(paciente.fecha_nacimiento) }} años
                </div>
              </td>
              <td class="table-cell">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-medical-primary flex items-center justify-center">
                      <span class="text-white text-sm font-medium">
                        {{ getIniciales(paciente.nombre, paciente.apellido) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ paciente.apellido }}, {{ paciente.nombre }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ paciente.genero }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">
                  {{ formatDate(paciente.fecha_nacimiento) }}
                </div>
              </td>
              <td class="table-cell">
                <div class="text-sm text-gray-900">
                  {{ paciente.telefono || 'No especificado' }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ paciente.email || 'No especificado' }}
                </div>
              </td>
              <td class="table-cell">
                <span class="text-sm text-gray-900">
                  {{ getObraSocialNombre(paciente.obra_social_id) }}
                </span>
              </td>
              <td class="table-cell">
                <div class="flex space-x-2">
                  <button 
                    @click="editarPaciente(paciente)"
                    class="btn-secondary-sm"
                    title="Editar paciente"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  
                  <router-link 
                    :to="`/turnos?paciente=${paciente.id}`"
                    class="btn-accent-sm"
                    title="Ver turnos del paciente"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </router-link>
                  
                  <button 
                    @click="confirmarEliminacion(paciente)"
                    class="btn-danger-sm"
                    title="Eliminar paciente"
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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay pacientes</h3>
      <p class="mt-1 text-sm text-gray-500">Comienza agregando un nuevo paciente.</p>
      <div class="mt-6">
        <button @click="mostrarModalPaciente = true" class="btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Nuevo Paciente
        </button>
      </div>
    </div>

    <!-- Modal de Paciente -->
    <div v-if="mostrarModalPaciente" class="modal-overlay" @click="cerrarModal">
      <div class="modal-content-large" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ modoEdicion ? 'Editar Paciente' : 'Nuevo Paciente' }}
          </h3>
          <button @click="cerrarModal" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="guardarPaciente" class="modal-body space-y-4">
          <!-- Información Personal -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">
                Nombre *
              </label>
              <input
                id="nombre"
                type="text"
                v-model="formPaciente.nombre"
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
                v-model="formPaciente.apellido"
                required
                class="input-field mt-1"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label for="dni" class="block text-sm font-medium text-gray-700">
                DNI *
              </label>
              <input
                id="dni"
                type="text"
                v-model="formPaciente.dni"
                required
                :disabled="modoEdicion"
                class="input-field mt-1"
              />
            </div>
            <div>
              <label for="fecha-nacimiento" class="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento *
              </label>
              <input
                id="fecha-nacimiento"
                type="date"
                v-model="formPaciente.fecha_nacimiento"
                required
                :max="fechaMaxima"
                class="input-field mt-1"
              />
            </div>
            <div>
              <label for="genero" class="block text-sm font-medium text-gray-700">
                Género
              </label>
              <select
                id="genero"
                v-model="formPaciente.genero"
                class="input-field mt-1"
              >
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="X">Otro</option>
              </select>
            </div>
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
                v-model="formPaciente.telefono"
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
                v-model="formPaciente.email"
                class="input-field mt-1"
              />
            </div>
          </div>

          <!-- Dirección -->
          <div>
            <label for="direccion" class="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              id="direccion"
              type="text"
              v-model="formPaciente.direccion"
              class="input-field mt-1"
            />
          </div>

          <!-- Obra Social -->
          <div>
            <label for="obra-social" class="block text-sm font-medium text-gray-700">
              Obra Social
            </label>
            <select
              id="obra-social"
              v-model="formPaciente.obra_social_id"
              class="input-field mt-1"
            >
              <option value="">Sin obra social</option>
              <option v-for="obra in obrasSociales" :key="obra.id" :value="obra.id">
                {{ obra.nombre }}
              </option>
            </select>
          </div>
        </form>
        
        <div class="modal-footer">
          <button @click="cerrarModal" type="button" class="btn-secondary">
            Cancelar
          </button>
          <button @click="guardarPaciente" :disabled="guardando" class="btn-primary">
            <svg v-if="guardando" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ guardando ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear Paciente') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { pacientesAPI, obrasSocialesAPI, utils } from '../services/api.js'

export default {
  name: 'PacientesList',
  setup() {
    // Estado reactivo
    const pacientes = ref([])
    const obrasSociales = ref([])
    const cargando = ref(true)
    const guardando = ref(false)
    const error = ref(null)
    const mostrarModalPaciente = ref(false)
    const modoEdicion = ref(false)
    const pacienteEditando = ref(null)

    // Filtros
    const filtros = reactive({
      buscar: '',
      obraSocialId: ''
    })

    // Formulario de paciente
    const formPaciente = reactive({
      nombre: '',
      apellido: '',
      dni: '',
      fecha_nacimiento: '',
      genero: 'M',
      telefono: '',
      email: '',
      direccion: '',
      obra_social_id: ''
    })

    // Computed properties
    const pacientesFiltrados = computed(() => {
      let resultado = pacientes.value

      // Filtro de búsqueda
      if (filtros.buscar) {
        const busqueda = filtros.buscar.toLowerCase()
        resultado = resultado.filter(paciente => 
          paciente.dni?.includes(busqueda) ||
          paciente.nombre?.toLowerCase().includes(busqueda) ||
          paciente.apellido?.toLowerCase().includes(busqueda) ||
          paciente.telefono?.includes(busqueda) ||
          paciente.email?.toLowerCase().includes(busqueda)
        )
      }

      // Filtro por obra social
      if (filtros.obraSocialId) {
        resultado = resultado.filter(paciente => 
          paciente.obra_social_id == filtros.obraSocialId
        )
      }

      // Ordenar por apellido
      return resultado.sort((a, b) => 
        (a.apellido || '').localeCompare(b.apellido || '')
      )
    })

    const fechaMaxima = computed(() => {
      const hoy = new Date()
      return hoy.toISOString().split('T')[0]
    })

    // Métodos
    const cargarDatos = async () => {
      try {
        cargando.value = true
        error.value = null

        const [pacientesData, obrasSocialesData] = await Promise.all([
          pacientesAPI.getAll(),
          obrasSocialesAPI.getAll()
        ])

        pacientes.value = pacientesData
        obrasSociales.value = obrasSocialesData
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
      Object.assign(formPaciente, {
        nombre: '',
        apellido: '',
        dni: '',
        fecha_nacimiento: '',
        genero: 'M',
        telefono: '',
        email: '',
        direccion: '',
        obra_social_id: ''
      })
    }

    const editarPaciente = (paciente) => {
      modoEdicion.value = true
      pacienteEditando.value = paciente
      
      Object.assign(formPaciente, {
        nombre: paciente.nombre || '',
        apellido: paciente.apellido || '',
        dni: paciente.dni || '',
        fecha_nacimiento: paciente.fecha_nacimiento || '',
        genero: paciente.genero || 'M',
        telefono: paciente.telefono || '',
        email: paciente.email || '',
        direccion: paciente.direccion || '',
        obra_social_id: paciente.obra_social_id || ''
      })
      
      mostrarModalPaciente.value = true
    }

    const cerrarModal = () => {
      mostrarModalPaciente.value = false
      modoEdicion.value = false
      pacienteEditando.value = null
      limpiarFormulario()
    }

    const guardarPaciente = async () => {
      try {
        guardando.value = true

        const pacienteData = { ...formPaciente }
        
        // Limpiar campos vacíos
        if (!pacienteData.obra_social_id) {
          pacienteData.obra_social_id = null
        }

        if (modoEdicion.value && pacienteEditando.value) {
          await pacientesAPI.update(pacienteEditando.value.id, pacienteData)
          
          // Actualizar en la lista local
          const index = pacientes.value.findIndex(p => p.id === pacienteEditando.value.id)
          if (index !== -1) {
            pacientes.value[index] = { ...pacientes.value[index], ...pacienteData }
          }
        } else {
          const nuevoPaciente = await pacientesAPI.create(pacienteData)
          pacientes.value.push(nuevoPaciente)
        }

        cerrarModal()
      } catch (err) {
        console.error('Error guardando paciente:', err)
        alert('Error al guardar el paciente. Verifica los datos e intenta nuevamente.')
      } finally {
        guardando.value = false
      }
    }

    const confirmarEliminacion = (paciente) => {
      if (confirm(`¿Estás seguro de que deseas eliminar el paciente ${paciente.nombre} ${paciente.apellido}?`)) {
        eliminarPaciente(paciente.id)
      }
    }

    const eliminarPaciente = async (id) => {
      try {
        await pacientesAPI.delete(id)
        pacientes.value = pacientes.value.filter(p => p.id !== id)
      } catch (err) {
        console.error('Error eliminando paciente:', err)
        alert('Error al eliminar el paciente')
      }
    }

    const getEdad = (fechaNacimiento) => {
      if (!fechaNacimiento) return 'N/A'
      const hoy = new Date()
      const nacimiento = new Date(fechaNacimiento)
      let edad = hoy.getFullYear() - nacimiento.getFullYear()
      const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth()
      
      if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--
      }
      
      return edad
    }

    const getIniciales = (nombre, apellido) => {
      const inicial1 = nombre ? nombre.charAt(0).toUpperCase() : ''
      const inicial2 = apellido ? apellido.charAt(0).toUpperCase() : ''
      return inicial1 + inicial2
    }

    const getObraSocialNombre = (obraSocialId) => {
      if (!obraSocialId) return 'Sin obra social'
      const obra = obrasSociales.value.find(o => o.id == obraSocialId)
      return obra ? obra.nombre : 'Desconocida'
    }

    // Utilidades
    const { formatDate } = utils

    // Cargar datos al montar
    onMounted(cargarDatos)

    return {
      // Estado
      pacientes,
      obrasSociales,
      cargando,
      guardando,
      error,
      mostrarModalPaciente,
      modoEdicion,
      filtros,
      formPaciente,
      
      // Computed
      pacientesFiltrados,
      fechaMaxima,
      
      // Métodos
      cargarDatos,
      aplicarFiltros,
      editarPaciente,
      cerrarModal,
      guardarPaciente,
      confirmarEliminacion,
      eliminarPaciente,
      getEdad,
      getIniciales,
      getObraSocialNombre,
      formatDate
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
  @apply inline-flex items-center p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200;
}

.btn-accent-sm {
  @apply inline-flex items-center p-1 border border-green-300 rounded text-green-600 hover:bg-green-50 hover:text-green-700 transition-colors duration-200;
}

.btn-danger-sm {
  @apply inline-flex items-center p-1 border border-red-300 rounded text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200;
}

.input-field {
  @apply block w-full border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed;
}

.table-header {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap text-sm text-gray-900;
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