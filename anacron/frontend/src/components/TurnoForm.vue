<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white shadow-card rounded-xl p-6">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-medical-dark">
              {{ modoEdicion ? 'Editar Turno' : 'Nuevo Turno' }}
            </h1>
            <p class="mt-1 text-sm text-gray-600">
              {{ modoEdicion ? 'Modifica los datos del turno médico' : 'Programa una nueva cita médica' }}
            </p>
          </div>
          <router-link to="/turnos" class="btn-secondary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Volver
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="cargandoDatos" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div class="flex">
          <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error</h3>
            <div class="mt-2 text-sm text-red-700">{{ error }}</div>
          </div>
        </div>
      </div>

      <!-- Formulario -->
      <form v-else @submit.prevent="guardarTurno" class="space-y-6">
        <!-- Información del Paciente -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Información del Paciente</h3>
          
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="buscar-paciente" class="block text-sm font-medium text-gray-700">
                Buscar Paciente por DNI
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  id="buscar-paciente"
                  type="text"
                  v-model="busquedaPaciente"
                  @input="buscarPacientePorDni"
                  placeholder="Ingresa el DNI"
                  class="input-field flex-1 rounded-r-none"
                />
                <button
                  type="button"
                  @click="buscarPacientePorDni"
                  class="btn-secondary rounded-l-none border-l-0"
                  :disabled="!busquedaPaciente.trim()"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div>
              <label for="paciente-select" class="block text-sm font-medium text-gray-700">
                Seleccionar Paciente
              </label>
              <select
                id="paciente-select"
                v-model="form.paciente_id"
                required
                class="input-field mt-1"
              >
                <option value="">Selecciona un paciente</option>
                <option v-for="paciente in pacientesFiltrados" :key="paciente.id" :value="paciente.id">
                  {{ paciente.apellido }}, {{ paciente.nombre }} - DNI: {{ paciente.dni }}
                </option>
              </select>
              <p v-if="validationErrors.paciente_id" class="mt-1 text-sm text-red-600">
                {{ validationErrors.paciente_id }}
              </p>
            </div>
          </div>

          <!-- Información del paciente seleccionado -->
          <div v-if="pacienteSeleccionado" class="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 class="font-medium text-blue-900">Paciente Seleccionado:</h4>
            <p class="text-sm text-blue-700 mt-1">
              {{ pacienteSeleccionado.nombre }} {{ pacienteSeleccionado.apellido }} - 
              DNI: {{ pacienteSeleccionado.dni }} - 
              Teléfono: {{ pacienteSeleccionado.telefono || 'No especificado' }}
            </p>
          </div>
        </div>

        <!-- Información del Profesional -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Información del Profesional</h3>
          
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="especialidad-select" class="block text-sm font-medium text-gray-700">
                Especialidad
              </label>
              <select
                id="especialidad-select"
                v-model="especialidadSeleccionada"
                @change="filtrarProfesionales"
                required
                class="input-field mt-1"
              >
                <option value="">Selecciona una especialidad</option>
                <option v-for="especialidad in especialidades" :key="especialidad.id" :value="especialidad.id">
                  {{ especialidad.nombre }}
                </option>
              </select>
            </div>

            <div>
              <label for="profesional-select" class="block text-sm font-medium text-gray-700">
                Profesional
              </label>
              <select
                id="profesional-select"
                v-model="form.profesional_id"
                required
                class="input-field mt-1"
                :disabled="!especialidadSeleccionada"
              >
                <option value="">Selecciona un profesional</option>
                <option v-for="profesional in profesionalesFiltrados" :key="profesional.id" :value="profesional.id">
                  Dr. {{ profesional.apellido }}, {{ profesional.nombre }} - Mat: {{ profesional.matricula }}
                </option>
              </select>
              <p v-if="validationErrors.profesional_id" class="mt-1 text-sm text-red-600">
                {{ validationErrors.profesional_id }}
              </p>
            </div>
          </div>

          <!-- Información del profesional seleccionado -->
          <div v-if="profesionalSeleccionado" class="mt-4 p-3 bg-green-50 rounded-lg">
            <h4 class="font-medium text-green-900">Profesional Seleccionado:</h4>
            <p class="text-sm text-green-700 mt-1">
              Dr. {{ profesionalSeleccionado.nombre }} {{ profesionalSeleccionado.apellido }} - 
              {{ profesionalSeleccionado.especialidad?.nombre }} - 
              Mat: {{ profesionalSeleccionado.matricula }}
            </p>
          </div>
        </div>

        <!-- Fecha y Hora -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="fecha" class="block text-sm font-medium text-gray-700">
              Fecha del Turno *
            </label>
            <input
              id="fecha"
              type="date"
              v-model="form.fecha"
              required
              :min="fechaMinima"
              class="input-field mt-1"
            />
            <p v-if="validationErrors.fecha" class="mt-1 text-sm text-red-600">
              {{ validationErrors.fecha }}
            </p>
          </div>

          <div>
            <label for="hora" class="block text-sm font-medium text-gray-700">
              Hora del Turno *
            </label>
            <input
              id="hora"
              type="time"
              v-model="form.hora"
              required
              class="input-field mt-1"
            />
            <p v-if="validationErrors.hora" class="mt-1 text-sm text-red-600">
              {{ validationErrors.hora }}
            </p>
          </div>
        </div>

        <!-- Detalles Adicionales -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="estado" class="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              id="estado"
              v-model="form.estado"
              class="input-field mt-1"
            >
              <option value="pendiente">Pendiente</option>
              <option value="confirmado">Confirmado</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
              <option value="no_asistio">No Asistió</option>
            </select>
          </div>

          <div>
            <label for="motivo" class="block text-sm font-medium text-gray-700">
              Motivo de la Consulta
            </label>
            <input
              id="motivo"
              type="text"
              v-model="form.motivo"
              placeholder="Ej: Consulta general, control, etc."
              class="input-field mt-1"
            />
          </div>
        </div>

        <!-- Observaciones -->
        <div>
          <label for="observaciones" class="block text-sm font-medium text-gray-700">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            v-model="form.observaciones"
            rows="3"
            placeholder="Notas adicionales sobre el turno..."
            class="input-field mt-1"
          ></textarea>
        </div>

        <!-- Botones de Acción -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <router-link to="/turnos" class="btn-secondary">
            Cancelar
          </router-link>
          <button
            type="submit"
            :disabled="guardando"
            class="btn-primary"
          >
            <svg v-if="guardando" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ guardando ? 'Guardando...' : (modoEdicion ? 'Actualizar Turno' : 'Crear Turno') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { turnosAPI, pacientesAPI, profesionalesAPI, especialidadesAPI } from '../services/api.js'

export default {
  name: 'TurnoForm',
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    // Estado reactivo
    const cargandoDatos = ref(true)
    const guardando = ref(false)
    const error = ref(null)
    
    const pacientes = ref([])
    const profesionales = ref([])
    const especialidades = ref([])
    
    const busquedaPaciente = ref('')
    const especialidadSeleccionada = ref('')
    
    const validationErrors = ref({})

    // Formulario
    const form = reactive({
      paciente_id: '',
      profesional_id: '',
      fecha: '',
      hora: '',
      estado: 'pendiente',
      motivo: '',
      observaciones: ''
    })

    // Computed properties
    const modoEdicion = computed(() => {
      return !!(props.id || route.params.id)
    })

    const turnoId = computed(() => {
      return props.id || route.params.id
    })

    const fechaMinima = computed(() => {
      const hoy = new Date()
      return hoy.toISOString().split('T')[0]
    })

    const pacienteSeleccionado = computed(() => {
      return pacientes.value.find(p => p.id == form.paciente_id)
    })

    const profesionalSeleccionado = computed(() => {
      return profesionales.value.find(p => p.id == form.profesional_id)
    })

    const pacientesFiltrados = computed(() => {
      if (!busquedaPaciente.value.trim()) return pacientes.value
      
      const busqueda = busquedaPaciente.value.toLowerCase()
      return pacientes.value.filter(paciente => 
        paciente.dni?.includes(busqueda) ||
        paciente.nombre?.toLowerCase().includes(busqueda) ||
        paciente.apellido?.toLowerCase().includes(busqueda)
      )
    })

    const profesionalesFiltrados = computed(() => {
      if (!especialidadSeleccionada.value) return []
      
      return profesionales.value.filter(profesional => 
        profesional.especialidad_id == especialidadSeleccionada.value
      )
    })

    // Métodos
    const cargarDatos = async () => {
      try {
        cargandoDatos.value = true
        error.value = null

        // Cargar datos básicos
        const [pacientesData, profesionalesData, especialidadesData] = await Promise.all([
          pacientesAPI.getAll(),
          profesionalesAPI.getAll(),
          especialidadesAPI.getAll()
        ])

        pacientes.value = pacientesData
        profesionales.value = profesionalesData
        especialidades.value = especialidadesData

        // Si estamos en modo edición, cargar el turno
        if (modoEdicion.value) {
          await cargarTurno()
        }
      } catch (err) {
        error.value = 'Error al cargar los datos necesarios'
        console.error('Error cargando datos:', err)
      } finally {
        cargandoDatos.value = false
      }
    }

    const cargarTurno = async () => {
      try {
        const turno = await turnosAPI.getById(turnoId.value)
        
        // Llenar el formulario con los datos del turno
        Object.assign(form, {
          paciente_id: turno.paciente_id,
          profesional_id: turno.profesional_id,
          fecha: turno.fecha,
          hora: turno.hora,
          estado: turno.estado,
          motivo: turno.motivo || '',
          observaciones: turno.observaciones || ''
        })

        // Encontrar y seleccionar la especialidad del profesional
        const profesional = profesionales.value.find(p => p.id == turno.profesional_id)
        if (profesional) {
          especialidadSeleccionada.value = profesional.especialidad_id
        }
      } catch (err) {
        error.value = 'Error al cargar los datos del turno'
        console.error('Error cargando turno:', err)
      }
    }

    const buscarPacientePorDni = async () => {
      if (!busquedaPaciente.value.trim()) return

      try {
        const dni = busquedaPaciente.value.trim()
        const paciente = pacientes.value.find(p => p.dni === dni)
        
        if (paciente) {
          form.paciente_id = paciente.id
        } else {
          // Si no lo encuentra localmente, buscar en la API
          try {
            const pacienteEncontrado = await pacientesAPI.getByDni(dni)
            if (pacienteEncontrado) {
              form.paciente_id = pacienteEncontrado.id
              // Agregar a la lista local si no está
              if (!pacientes.value.find(p => p.id === pacienteEncontrado.id)) {
                pacientes.value.push(pacienteEncontrado)
              }
            }
          } catch {
            alert('No se encontró ningún paciente con ese DNI')
          }
        }
      } catch (err) {
        console.error('Error buscando paciente:', err)
      }
    }

    const filtrarProfesionales = () => {
      form.profesional_id = '' // Limpiar selección de profesional
    }

    const validarFormulario = () => {
      validationErrors.value = {}

      if (!form.paciente_id) {
        validationErrors.value.paciente_id = 'Debe seleccionar un paciente'
      }

      if (!form.profesional_id) {
        validationErrors.value.profesional_id = 'Debe seleccionar un profesional'
      }

      if (!form.fecha) {
        validationErrors.value.fecha = 'Debe seleccionar una fecha'
      } else if (new Date(form.fecha) < new Date(fechaMinima.value)) {
        validationErrors.value.fecha = 'La fecha no puede ser anterior a hoy'
      }

      if (!form.hora) {
        validationErrors.value.hora = 'Debe seleccionar una hora'
      }

      return Object.keys(validationErrors.value).length === 0
    }

    const guardarTurno = async () => {
      if (!validarFormulario()) return

      try {
        guardando.value = true

        const turnoData = { ...form }

        if (modoEdicion.value) {
          await turnosAPI.update(turnoId.value, turnoData)
        } else {
          await turnosAPI.create(turnoData)
        }

        // Redirigir a la lista de turnos
        router.push('/turnos')
      } catch (err) {
        error.value = 'Error al guardar el turno. Verifica los datos e intenta nuevamente.'
        console.error('Error guardando turno:', err)
      } finally {
        guardando.value = false
      }
    }

    // Watchers
    watch(() => form.paciente_id, () => {
      if (validationErrors.value.paciente_id) {
        delete validationErrors.value.paciente_id
      }
    })

    watch(() => form.profesional_id, () => {
      if (validationErrors.value.profesional_id) {
        delete validationErrors.value.profesional_id
      }
    })

    // Cargar datos al montar
    onMounted(cargarDatos)

    return {
      // Estado
      cargandoDatos,
      guardando,
      error,
      pacientes,
      profesionales,
      especialidades,
      busquedaPaciente,
      especialidadSeleccionada,
      validationErrors,
      form,
      
      // Computed
      modoEdicion,
      fechaMinima,
      pacienteSeleccionado,
      profesionalSeleccionado,
      pacientesFiltrados,
      profesionalesFiltrados,
      
      // Métodos
      buscarPacientePorDni,
      filtrarProfesionales,
      guardarTurno
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

.input-field {
  @apply block w-full border-gray-300 rounded-md shadow-sm focus:ring-medical-primary focus:border-medical-primary sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed;
}
</style>