import { PrismaClient, TipoEstablecimiento, EstadoTurno } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando proceso de seed...')

  // 1. Crear Obras Sociales
  console.log('📋 Creando obras sociales...')
  const obrasSociales = await Promise.all([
    prisma.obraSocial.create({
      data: {
        nombre: 'OSDE',
        tipoCobertura: 'Prepaga',
        activo: true
      }
    }),
    prisma.obraSocial.create({
      data: {
        nombre: 'Swiss Medical',
        tipoCobertura: 'Prepaga',
        activo: true
      }
    }),
    prisma.obraSocial.create({
      data: {
        nombre: 'IOMA',
        tipoCobertura: 'Obra Social',
        activo: true
      }
    }),
    prisma.obraSocial.create({
      data: {
        nombre: 'PAMI',
        tipoCobertura: 'Jubilados',
        activo: true
      }
    })
  ])

  // 2. Crear Establecimientos
  console.log('🏥 Creando establecimientos...')
  const establecimientos = await Promise.all([
    prisma.establecimiento.create({
      data: {
        nombre: 'Hospital Central',
        tipo: TipoEstablecimiento.HOSPITAL,
        direccion: 'Av. Rivadavia 1234, Buenos Aires',
        telefono: '011-4444-5555',
        email: 'info@hospitalcentral.com.ar',
        horarioApertura: '08:00',
        horarioCierre: '20:00',
        activo: true
      }
    }),
    prisma.establecimiento.create({
      data: {
        nombre: 'Clínica San Juan',
        tipo: TipoEstablecimiento.CLINICA,
        direccion: 'Calle San Juan 456, CABA',
        telefono: '011-3333-2222',
        email: 'contacto@clinicasanjuan.com.ar',
        horarioApertura: '07:30',
        horarioCierre: '19:00',
        activo: true
      }
    }),
    prisma.establecimiento.create({
      data: {
        nombre: 'Centro Médico Norte',
        tipo: TipoEstablecimiento.CENTRO_MEDICO,
        direccion: 'Av. del Libertador 789, Vicente López',
        telefono: '011-5555-6666',
        email: 'admin@centromediconorte.com.ar',
        horarioApertura: '08:00',
        horarioCierre: '18:00',
        activo: true
      }
    }),
    prisma.establecimiento.create({
      data: {
        nombre: 'Sanatorio Modelo',
        tipo: TipoEstablecimiento.SANATORIO,
        direccion: 'Calle Modelo 321, San Isidro',
        telefono: '011-7777-8888',
        email: 'info@sanatoriomodelo.com.ar',
        horarioApertura: '24:00',
        horarioCierre: '24:00',
        activo: true
      }
    })
  ])

  // 3. Crear Especialidades
  console.log('🩺 Creando especialidades...')
  const especialidades = await Promise.all([
    prisma.especialidad.create({
      data: {
        nombre: 'Cardiología',
        descripcion: 'Especialidad médica que se encarga del estudio, diagnóstico y tratamiento de las enfermedades del corazón',
        duracionEstimadaMinutos: 45,
        activo: true
      }
    }),
    prisma.especialidad.create({
      data: {
        nombre: 'Neurología',
        descripcion: 'Especialidad médica que trata los trastornos del sistema nervioso',
        duracionEstimadaMinutos: 60,
        activo: true
      }
    }),
    prisma.especialidad.create({
      data: {
        nombre: 'Pediatría',
        descripcion: 'Rama de la medicina que se especializa en la salud y las enfermedades de los niños',
        duracionEstimadaMinutos: 30,
        activo: true
      }
    }),
    prisma.especialidad.create({
      data: {
        nombre: 'Traumatología',
        descripcion: 'Especialidad médica que se dedica al estudio de las lesiones del aparato locomotor',
        duracionEstimadaMinutos: 40,
        activo: true
      }
    }),
    prisma.especialidad.create({
      data: {
        nombre: 'Ginecología',
        descripcion: 'Especialidad médica que trata las enfermedades del sistema reproductor femenino',
        duracionEstimadaMinutos: 35,
        activo: true
      }
    }),
    prisma.especialidad.create({
      data: {
        nombre: 'Dermatología',
        descripcion: 'Especialidad médica que se encarga del estudio de la estructura y función de la piel',
        duracionEstimadaMinutos: 25,
        activo: true
      }
    })
  ])

  // 4. Crear Profesionales
  console.log('👨‍⚕️ Creando profesionales...')
  const profesionales = await Promise.all([
    prisma.profesional.create({
      data: {
        nombre: 'Dr. Juan Carlos',
        apellido: 'Pérez',
        matricula: 'MP12345',
        telefono: '011-1111-2222',
        email: 'juan.perez@anacron.com',
        establecimientoId: establecimientos[0].id,
        activo: true
      }
    }),
    prisma.profesional.create({
      data: {
        nombre: 'Dra. María Elena',
        apellido: 'González',
        matricula: 'MP54321',
        telefono: '011-2222-3333',
        email: 'maria.gonzalez@anacron.com',
        establecimientoId: establecimientos[1].id,
        activo: true
      }
    }),
    prisma.profesional.create({
      data: {
        nombre: 'Dr. Roberto',
        apellido: 'Martínez',
        matricula: 'MP11111',
        telefono: '011-3333-4444',
        email: 'roberto.martinez@anacron.com',
        establecimientoId: establecimientos[2].id,
        activo: true
      }
    }),
    prisma.profesional.create({
      data: {
        nombre: 'Dra. Ana Sofía',
        apellido: 'López',
        matricula: 'MP22222',
        telefono: '011-4444-5555',
        email: 'ana.lopez@anacron.com',
        establecimientoId: establecimientos[0].id,
        activo: true
      }
    }),
    prisma.profesional.create({
      data: {
        nombre: 'Dr. Carlos Alberto',
        apellido: 'Fernández',
        matricula: 'MP33333',
        telefono: '011-5555-6666',
        email: 'carlos.fernandez@anacron.com',
        establecimientoId: establecimientos[3].id,
        activo: true
      }
    })
  ])

  // 5. Crear relaciones Profesional-Especialidad
  console.log('🔗 Creando relaciones profesional-especialidad...')
  await Promise.all([
    // Dr. Pérez - Cardiología
    prisma.profesionalEspecialidad.create({
      data: {
        profesionalId: profesionales[0].id,
        especialidadId: especialidades[0].id
      }
    }),
    // Dra. González - Neurología y Pediatría
    prisma.profesionalEspecialidad.create({
      data: {
        profesionalId: profesionales[1].id,
        especialidadId: especialidades[1].id
      }
    }),
    prisma.profesionalEspecialidad.create({
      data: {
        profesionalId: profesionales[1].id,
        especialidadId: especialidades[2].id
      }
    }),
    // Dr. Martínez - Traumatología
    prisma.profesionalEspecialidad.create({
      data: {
        profesionalId: profesionales[2].id,
        especialidadId: especialidades[3].id
      }
    }),
    // Dra. López - Ginecología
    prisma.profesionalEspecialidad.create({
      data: {
        profesionalId: profesionales[3].id,
        especialidadId: especialidades[4].id
      }
    }),
    // Dr. Fernández - Dermatología
    prisma.profesionalEspecialidad.create({
      data: {
        profesionalId: profesionales[4].id,
        especialidadId: especialidades[5].id
      }
    })
  ])

  // 6. Crear relaciones Establecimiento-ObraSocial
  console.log('🔗 Creando relaciones establecimiento-obra social...')
  await Promise.all([
    // Hospital Central acepta todas las obras sociales
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[0].id,
        obraSocialId: obrasSociales[0].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[0].id,
        obraSocialId: obrasSociales[1].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[0].id,
        obraSocialId: obrasSociales[2].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[0].id,
        obraSocialId: obrasSociales[3].id,
      }
    }),
    // Clínica San Juan acepta prepagas
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[1].id,
        obraSocialId: obrasSociales[0].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[1].id,
        obraSocialId: obrasSociales[1].id,
      }
    }),
    // Centro Médico Norte acepta todas menos PAMI
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[2].id,
        obraSocialId: obrasSociales[0].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[2].id,
        obraSocialId: obrasSociales[1].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[2].id,
        obraSocialId: obrasSociales[2].id,
      }
    }),
    // Sanatorio Modelo acepta todas
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[3].id,
        obraSocialId: obrasSociales[0].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[3].id,
        obraSocialId: obrasSociales[1].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[3].id,
        obraSocialId: obrasSociales[2].id,
      }
    }),
    prisma.establecimientoObraSocial.create({
      data: {
        establecimientoId: establecimientos[3].id,
        obraSocialId: obrasSociales[3].id,
      }
    })
  ])

  // 7. Crear Pacientes
  console.log('👥 Creando pacientes...')
  const pacientes = await Promise.all([
    prisma.paciente.create({
      data: {
        nombre: 'Carlos Alberto',
        apellido: 'Rodríguez',
        dni: '11111111',
        email: 'carlos.rodriguez@email.com',
        telefono: '011-5555-6666',
        fechaNacimiento: new Date('1985-03-15'),
        obraSocialId: obrasSociales[0].id,
        activo: true
      }
    }),
    prisma.paciente.create({
      data: {
        nombre: 'Ana María',
        apellido: 'López',
        dni: '22222222',
        email: 'ana.lopez@email.com',
        telefono: '011-6666-7777',
        fechaNacimiento: new Date('1990-07-20'),
        obraSocialId: obrasSociales[1].id,
        activo: true
      }
    }),
    prisma.paciente.create({
      data: {
        nombre: 'José Luis',
        apellido: 'García',
        dni: '33333333',
        email: 'jose.garcia@email.com',
        telefono: '011-7777-8888',
        fechaNacimiento: new Date('1978-12-10'),
        obraSocialId: obrasSociales[2].id,
        activo: true
      }
    }),
    prisma.paciente.create({
      data: {
        nombre: 'María del Carmen',
        apellido: 'Fernández',
        dni: '44444444',
        email: 'maria.fernandez@email.com',
        telefono: '011-8888-9999',
        fechaNacimiento: new Date('1965-05-25'),
        obraSocialId: obrasSociales[3].id,
        activo: true
      }
    }),
    prisma.paciente.create({
      data: {
        nombre: 'Pedro Antonio',
        apellido: 'Martín',
        dni: '55555555',
        email: 'pedro.martin@email.com',
        telefono: '011-9999-0000',
        fechaNacimiento: new Date('1992-09-08'),
        obraSocialId: obrasSociales[0].id,
        activo: true
      }
    }),
    prisma.paciente.create({
      data: {
        nombre: 'Laura Beatriz',
        apellido: 'Sánchez',
        dni: '66666666',
        email: 'laura.sanchez@email.com',
        telefono: '011-0000-1111',
        fechaNacimiento: new Date('1988-11-30'),
        obraSocialId: obrasSociales[1].id,
        activo: true
      }
    })
  ])

  // 8. Crear Turnos
  console.log('📅 Creando turnos...')
  const turnos = await Promise.all([
    prisma.turno.create({
      data: {
        pacienteId: pacientes[0].id,
        profesionalId: profesionales[0].id,
        especialidadId: especialidades[0].id,
        establecimientoId: establecimientos[0].id,
        fechaTurno: new Date('2025-11-20'),
        horaTurno: '10:00',
        estado: EstadoTurno.PENDIENTE,
        observaciones: 'Control rutinario - Primera vez',
        numeroReferencia: 'TUR-2025-001'
      }
    }),
    prisma.turno.create({
      data: {
        pacienteId: pacientes[1].id,
        profesionalId: profesionales[1].id,
        especialidadId: especialidades[1].id,
        establecimientoId: establecimientos[1].id,
        fechaTurno: new Date('2025-11-21'),
        horaTurno: '15:30',
        estado: EstadoTurno.CONFIRMADO,
        observaciones: 'Consulta por dolores de cabeza frecuentes',
        numeroReferencia: 'TUR-2025-002'
      }
    }),
    prisma.turno.create({
      data: {
        pacienteId: pacientes[2].id,
        profesionalId: profesionales[2].id,
        especialidadId: especialidades[3].id,
        establecimientoId: establecimientos[2].id,
        fechaTurno: new Date('2025-11-22'),
        horaTurno: '09:15',
        estado: EstadoTurno.PENDIENTE,
        observaciones: 'Dolor en rodilla derecha',
        numeroReferencia: 'TUR-2025-003'
      }
    }),
    prisma.turno.create({
      data: {
        pacienteId: pacientes[3].id,
        profesionalId: profesionales[3].id,
        especialidadId: especialidades[4].id,
        establecimientoId: establecimientos[0].id,
        fechaTurno: new Date('2025-11-25'),
        horaTurno: '11:00',
        estado: EstadoTurno.CONFIRMADO,
        observaciones: 'Control ginecológico anual',
        numeroReferencia: 'TUR-2025-004'
      }
    }),
    prisma.turno.create({
      data: {
        pacienteId: pacientes[4].id,
        profesionalId: profesionales[4].id,
        especialidadId: especialidades[5].id,
        establecimientoId: establecimientos[3].id,
        fechaTurno: new Date('2025-11-26'),
        horaTurno: '14:45',
        estado: EstadoTurno.PENDIENTE,
        observaciones: 'Consulta por lunares nuevos',
        numeroReferencia: 'TUR-2025-005'
      }
    }),
    prisma.turno.create({
      data: {
        pacienteId: pacientes[5].id,
        profesionalId: profesionales[1].id,
        especialidadId: especialidades[2].id,
        establecimientoId: establecimientos[1].id,
        fechaTurno: new Date('2025-11-27'),
        horaTurno: '16:00',
        estado: EstadoTurno.COMPLETADO,
        observaciones: 'Control pediátrico de rutina',
        numeroReferencia: 'TUR-2025-006'
      }
    })
  ])

  // 9. Crear Historial de Consultas
  console.log('📋 Creando historial de consultas...')
  await Promise.all([
    prisma.historialConsulta.create({
      data: {
        pacienteId: pacientes[5].id,
        profesionalId: profesionales[1].id,
        especialidadId: especialidades[2].id,
        establecimientoId: establecimientos[1].id,
        turnoId: turnos[5].id,
        fechaConsulta: new Date('2025-11-27'),
        horaConsulta: '16:00',
        tipoConsulta: 'Control pediátrico',
        diagnostico: 'Desarrollo normal para la edad. Vacunación al día.',
        tratamiento: 'Continuar con controles de rutina. Próximo control en 6 meses.',
        observaciones: 'Paciente en excelente estado de salud. Padres muy colaborativos.'
      }
    }),
    prisma.historialConsulta.create({
      data: {
        pacienteId: pacientes[0].id,
        profesionalId: profesionales[0].id,
        especialidadId: especialidades[0].id,
        establecimientoId: establecimientos[0].id,
        fechaConsulta: new Date('2025-10-15'),
        horaConsulta: '10:30',
        tipoConsulta: 'Control cardiológico',
        diagnostico: 'Hipertensión arterial leve. ECG normal.',
        tratamiento: 'Dieta hiposódica. Enalapril 10mg/día. Control en 3 meses.',
        observaciones: 'Se recomienda ejercicio moderado y reducción de peso.'
      }
    })
  ])

  console.log('✅ Proceso de seed completado exitosamente!')
  console.log('')
  console.log('📊 RESUMEN DE DATOS CREADOS:')
  console.log(`- ${obrasSociales.length} obras sociales`)
  console.log(`- ${establecimientos.length} establecimientos`)
  console.log(`- ${especialidades.length} especialidades`)
  console.log(`- ${profesionales.length} profesionales`)
  console.log(`- ${pacientes.length} pacientes`)
  console.log(`- ${turnos.length} turnos`)
  console.log('- 2 registros de historial médico')
  console.log('')
  console.log('🎉 Base de datos lista para usar!')
}

main()
  .catch((e) => {
    console.error('❌ Error durante el proceso de seed:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🔌 Conexión a la base de datos cerrada.')
  })