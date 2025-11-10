// API Configuration
const API_BASE_URL = 'http://localhost:3000'

// Generic API function
async function apiCall(endpoint, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Turnos API
export const turnosAPI = {
  // Obtener todos los turnos
  async getAll() {
    return apiCall('/turnos')
  },

  // Obtener turno por ID
  async getById(id) {
    return apiCall(`/turnos/${id}`)
  },

  // Crear nuevo turno
  async create(turno) {
    return apiCall('/turnos', {
      method: 'POST',
      body: JSON.stringify(turno)
    })
  },

  // Actualizar turno
  async update(id, turno) {
    return apiCall(`/turnos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(turno)
    })
  },

  // Eliminar turno
  async delete(id) {
    return apiCall(`/turnos/${id}`, {
      method: 'DELETE'
    })
  },

  // Obtener turnos por fecha
  async getByDate(fecha) {
    return apiCall(`/turnos/fecha/${fecha}`)
  },

  // Obtener turnos por paciente
  async getByPaciente(pacienteId) {
    return apiCall(`/turnos/paciente/${pacienteId}`)
  }
}

// Pacientes API
export const pacientesAPI = {
  async getAll() {
    return apiCall('/pacientes')
  },

  async getById(id) {
    return apiCall(`/pacientes/${id}`)
  },

  async create(paciente) {
    return apiCall('/pacientes', {
      method: 'POST',
      body: JSON.stringify(paciente)
    })
  },

  async update(id, paciente) {
    return apiCall(`/pacientes/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(paciente)
    })
  },

  async delete(id) {
    return apiCall(`/pacientes/${id}`, {
      method: 'DELETE'
    })
  },

  // Buscar paciente por DNI
  async getByDni(dni) {
    return apiCall(`/pacientes/dni/${dni}`)
  }
}

// Profesionales API
export const profesionalesAPI = {
  async getAll() {
    return apiCall('/profesionales')
  },

  async getById(id) {
    return apiCall(`/profesionales/${id}`)
  },

  async create(profesional) {
    return apiCall('/profesionales', {
      method: 'POST',
      body: JSON.stringify(profesional)
    })
  },

  async update(id, profesional) {
    return apiCall(`/profesionales/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(profesional)
    })
  },

  async delete(id) {
    return apiCall(`/profesionales/${id}`, {
      method: 'DELETE'
    })
  },

  // Obtener profesionales por especialidad
  async getByEspecialidad(especialidadId) {
    return apiCall(`/profesionales/especialidad/${especialidadId}`)
  }
}

// Especialidades API
export const especialidadesAPI = {
  async getAll() {
    return apiCall('/especialidades')
  },

  async getById(id) {
    return apiCall(`/especialidades/${id}`)
  },

  async create(especialidad) {
    return apiCall('/especialidades', {
      method: 'POST',
      body: JSON.stringify(especialidad)
    })
  },

  async update(id, especialidad) {
    return apiCall(`/especialidades/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(especialidad)
    })
  },

  async delete(id) {
    return apiCall(`/especialidades/${id}`, {
      method: 'DELETE'
    })
  }
}

// Establecimientos API
export const establecimientosAPI = {
  async getAll() {
    return apiCall('/establecimientos')
  },

  async getById(id) {
    return apiCall(`/establecimientos/${id}`)
  },

  async create(establecimiento) {
    return apiCall('/establecimientos', {
      method: 'POST',
      body: JSON.stringify(establecimiento)
    })
  },

  async update(id, establecimiento) {
    return apiCall(`/establecimientos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(establecimiento)
    })
  },

  async delete(id) {
    return apiCall(`/establecimientos/${id}`, {
      method: 'DELETE'
    })
  }
}

// Obras Sociales API
export const obrasSocialesAPI = {
  async getAll() {
    return apiCall('/obras-sociales')
  },

  async getById(id) {
    return apiCall(`/obras-sociales/${id}`)
  },

  async create(obraSocial) {
    return apiCall('/obras-sociales', {
      method: 'POST',
      body: JSON.stringify(obraSocial)
    })
  },

  async update(id, obraSocial) {
    return apiCall(`/obras-sociales/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(obraSocial)
    })
  },

  async delete(id) {
    return apiCall(`/obras-sociales/${id}`, {
      method: 'DELETE'
    })
  }
}

// Utilidades para formateo de datos
export const utils = {
  // Formatear fecha para mostrar
  formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  },

  // Formatear hora
  formatTime(timeString) {
    return timeString || 'No especificada'
  },

  // Obtener color del estado del turno
  getEstadoColor(estado) {
    const colors = {
      'pendiente': 'turno-pendiente',
      'confirmado': 'turno-confirmado', 
      'completado': 'turno-completado',
      'cancelado': 'turno-cancelado',
      'no_asistio': 'turno-noAsistio'
    }
    return colors[estado] || 'turno-pendiente'
  },

  // Capitalizar primera letra
  capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
  }
}