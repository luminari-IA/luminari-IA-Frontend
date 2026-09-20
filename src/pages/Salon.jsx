import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import StatCard from '../components/ui/StatCard'
import ProgressCourse from '../components/ui/ProgressCourse'
import TaskItem from '../components/ui/TaskItem'
import TaskModal from '../components/TaskModal'

const MATERIAS = [
  { name: 'Física',       tema: 'Movimiento armónico',    pct: 72, color: '#6c63ff' },
  { name: 'Matemáticas',  tema: 'Funciones cuadráticas',  pct: 64, color: '#00d4ff' },
  { name: 'Química',      tema: 'Reacciones redox',       pct: 48, color: '#f59e0b' },
  { name: 'Biología',     tema: 'Genética molecular',     pct: 84, color: '#22c55e' },
]

const TAREAS_INIT = [
  {
    id: 1, materia: 'Física',      color: '#6c63ff',
    titulo: 'Simulación del péndulo',
    desc: 'Realiza la simulación del péndulo simple. Anota los valores de periodo para diferentes longitudes (0.5m, 1m, 1.5m) y elabora una tabla comparativa.',
    due: 'Hoy · 23:59', done: false, archivo: null,
    iaNote: 'Nexa sugiere usar la fórmula T = 2π√(L/g) para validar tus resultados.'
  },
  {
    id: 2, materia: 'Matemáticas', color: '#00d4ff',
    titulo: 'Ejercicios 8–14',
    desc: 'Resuelve los ejercicios de funciones cuadráticas del libro. Muestra el procedimiento completo y grafica al menos 3 parábolas.',
    due: 'Mañana · 18:00', done: true, archivo: 'ejercicios_mat.pdf',
    iaNote: 'Nexa revisó tu entrega anterior. ¡Excelente comprensión del vértice!'
  },
  {
    id: 3, materia: 'Química',     color: '#f59e0b',
    titulo: 'Reporte de laboratorio',
    desc: 'Elabora el reporte de la práctica de reacciones redox. Incluye: objetivo, materiales, procedimiento, resultados y conclusiones.',
    due: 'Vie 22 · 12:00', done: false, archivo: null,
    iaNote: 'Nexa preparó una guía de formato para el reporte. Accede desde Recursos.'
  },
]

export default function Salon() {
  const [tareas, setTareas] = useState(TAREAS_INIT)
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  function abrirTarea(t) { setTareaSeleccionada(t) }
  function cerrarModal() { setTareaSeleccionada(null) }

  function onFileChange(e) {
    const file = e.target.files[0]
    if (!file || !tareaSeleccionada) return
    subirArchivo(file)
  }

  function subirArchivo(file) {
    setTareas(prev => prev.map(t =>
      t.id === tareaSeleccionada.id ? { ...t, archivo: file.name, done: true } : t
    ))
    setTareaSeleccionada(prev => ({ ...prev, archivo: file.name, done: true }))
  }

  function onDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) subirArchivo(file)
  }

  const pendientes = tareas.filter(t => !t.done).length

  return (
    <DashboardLayout
      breadcrumb="Lumirai / Salón de clases"
      title="Buenos días, Sofía 👋"
      subtitle={`Tienes ${pendientes} tarea${pendientes !== 1 ? 's' : ''} pendiente${pendientes !== 1 ? 's' : ''} y una clase en vivo a las 16:30.`}
      rightElement={
        <div className="badge-pill badge-success">
          <i className="bi bi-cpu-fill" /> IA CONECTADA
        </div>
      }
    >
      <div className="row g-4">
        {/* Left column */}
        <div className="col-lg-8">
          {/* Stats row */}
          <div className="row g-3 mb-4 fade-up fade-up-d1">
            <div className="col-sm-4">
              <StatCard value="68%" label="Dominio general" colorClass="primary2" progress={68} />
            </div>
            <div className="col-sm-4">
              <StatCard value="12" label="Racha actual" colorClass="accent" subtitle="días" />
            </div>
            <div className="col-sm-4">
              <StatCard value="7.4h" label="Enfoque semanal" colorClass="warning" subtitle="esta semana" />
            </div>
          </div>

          {/* Temario curricular */}
          <div className="lum-card p-4 mb-4 fade-up fade-up-d2">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>Temario curricular</h5>
              <span style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>4 MATERIAS</span>
            </div>
            <div className="d-flex flex-column gap-3">
              {MATERIAS.map((m, i) => (
                <ProgressCourse key={i} name={m.name} tema={m.tema} pct={m.pct} color={m.color} />
              ))}
            </div>
            <div className="mt-3">
              <Link to="/salon/vivo" className="btn-lum btn-lum-primary" style={{ padding: '10px 22px' }}>
                <i className="bi bi-play-fill" /> Continuar Física
              </Link>
            </div>
          </div>

          {/* Tareas */}
          <div className="lum-card p-4 fade-up fade-up-d3">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>
                <i className="bi bi-journal-check me-2" style={{ color: 'var(--lum-primary2)' }} />
                Tareas asignadas por Nexa
              </h5>
              <span className="badge-pill badge-warning">{pendientes} PENDIENTES</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {tareas.map(t => (
                <TaskItem key={t.id} task={t} onOpen={abrirTarea} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-4">
          <div className="lum-card p-4 mb-4 fade-up fade-up-d1" style={{ border: '1px solid rgba(108,99,255,.3)' }}>
            <div className="badge-pill badge-primary mb-3">HOY · 16:30</div>
            <h5 style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>Laboratorio de ondas</h5>
            <p style={{ color: 'var(--lum-muted)', fontSize: '.82rem', marginBottom: 16 }}>
              Con Nexa y 8 estudiantes · 45 min
            </p>
            <Link to="/salon/vivo" className="btn-lum btn-lum-primary w-100 justify-content-center" style={{ padding: '10px' }}>
              Ver preparación
            </Link>
          </div>

          <div className="lum-card p-4 fade-up fade-up-d2">
            <h6 style={{ fontWeight: 700, color: '#fff', marginBottom: 12 }}>Resumen de tareas</h6>
            {tareas.map((t, i) => (
              <div key={i} className="d-flex align-items-center gap-2 mb-2">
                <i className={`bi ${t.done ? 'bi-check-circle-fill' : 'bi-circle'}`}
                  style={{ color: t.done ? 'var(--lum-success)' : 'var(--lum-muted)', flexShrink: 0 }} />
                <span style={{ fontSize: '.82rem', color: t.done ? 'var(--lum-muted)' : 'var(--lum-text)',
                  textDecoration: t.done ? 'line-through' : 'none' }}>
                  {t.materia} · {t.titulo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TaskModal 
        task={tareaSeleccionada}
        onClose={cerrarModal}
        onDrop={onDrop}
        onFileChange={onFileChange}
        fileRef={fileRef}
        dragging={dragging}
        setDragging={setDragging}
      />
    </DashboardLayout>
  )
}
