import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import StatCard from '../components/ui/StatCard'
import ProgressCourse from '../components/ui/ProgressCourse'
import TaskItem from '../components/ui/TaskItem'
import TaskModal from '../components/TaskModal'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Salon() {
  const { user } = useAuth()
  const userName = user?.name ? user.name.split(' ')[0] : 'Estudiante'

  const [materias, setMaterias] = useState([])
  const [tareas, setTareas] = useState([])

  
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    // Cargar materias
    api.get('/subjects').then(res => {
      // Mapeamos colores y porcentajes aleatorios/falsos por ahora si no vienen del back
      const colors = ['#6c63ff', '#00d4ff', '#f59e0b', '#22c55e'];
      const data = res.data.data.map((m, i) => ({
        ...m,
        color: colors[i % colors.length],
        pct: 0 // Iniciar en 0% ya que no hay historial real
      }))
      setMaterias(data)
    }).catch(err => console.error(err))

    // Cargar tareas reales
    api.get('/tasks').then(res => {
      const colors = ['#6c63ff', '#00d4ff', '#f59e0b', '#22c55e'];
      const tasksData = res.data.data.map((t, i) => ({
        id: t.id,
        materia: t.subject?.name || 'General',
        color: colors[i % colors.length],
        titulo: t.title,
        desc: t.description,
        due: t.due_date ? new Date(t.due_date).toLocaleDateString() : 'Sin fecha',
        done: t.is_completed,
        archivo: t.file_path,
        iaNote: t.nexa_note
      }))
      setTareas(tasksData)
    }).catch(err => console.error(err))


  }, [])

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
      breadcrumb="Luminary / Salón de clases"
      title={`Buenos días, ${userName} 👋`}
      subtitle={`Tienes ${pendientes} tarea${pendientes !== 1 ? 's' : ''} pendiente${pendientes !== 1 ? 's' : ''}.`}
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
              <StatCard value="0%" label="Dominio general" colorClass="primary2" progress={0} />
            </div>
            <div className="col-sm-4">
              <StatCard value="0" label="Racha actual" colorClass="accent" subtitle="días" />
            </div>
            <div className="col-sm-4">
              <StatCard value="0h" label="Enfoque semanal" colorClass="warning" subtitle="esta semana" />
            </div>
          </div>

          {/* Temario curricular */}
          <div className="lum-card p-4 mb-4 fade-up fade-up-d2">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>Temario curricular</h5>
              <span style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>{materias.length} MATERIAS</span>
            </div>
            <div className="d-flex flex-column gap-3">
              {materias.length === 0 ? (
                <p style={{ color: 'var(--lum-muted)' }}>No hay materias asignadas.</p>
              ) : (
                materias.map((m, i) => (
                  <ProgressCourse key={m.id} name={m.name} tema={m.description || 'Tema actual'} pct={m.pct} color={m.color} />
                ))
              )}
            </div>
            {materias.length > 0 && (
              <div className="mt-3">
                <Link to="/salon/vivo" className="btn-lum btn-lum-primary" style={{ padding: '10px 22px' }}>
                  <i className="bi bi-play-fill" /> Continuar {materias[0].name}
                </Link>
              </div>
            )}
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
              {tareas.length === 0 ? (
                <p style={{ color: 'var(--lum-muted)' }}>No tienes tareas pendientes. ¡Buen trabajo!</p>
              ) : (
                tareas.map(t => (
                  <TaskItem key={t.id} task={t} onOpen={abrirTarea} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-4">
          <div className="lum-card p-4 mb-4 fade-up fade-up-d1" style={{ border: '1px solid rgba(108,99,255,.3)' }}>
            <div className="badge-pill badge-primary mb-3">
              <i className="bi bi-robot" /> NUEVO
            </div>
            <h5 style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>Clases bajo demanda</h5>
            <p style={{ color: 'var(--lum-muted)', fontSize: '.82rem', marginBottom: 16 }}>
              Inicia una sesión interactiva con Nexa en cualquier momento.
            </p>
            <Link to="/salon/vivo" className="btn-lum btn-lum-primary w-100 justify-content-center" style={{ padding: '10px' }}>
              <i className="bi bi-play-fill me-2" />
              Empezar ahora
            </Link>
          </div>

          <div className="lum-card p-4 fade-up fade-up-d2">
            <h6 style={{ fontWeight: 700, color: '#fff', marginBottom: 12 }}>Resumen de tareas</h6>
            {tareas.length === 0 ? (
              <p style={{ color: 'var(--lum-muted)', fontSize: '.85rem' }}>Nada pendiente.</p>
            ) : (
              tareas.map((t, i) => (
                <div key={i} className="d-flex align-items-center gap-2 mb-2">
                  <i className={`bi ${t.done ? 'bi-check-circle-fill' : 'bi-circle'}`}
                    style={{ color: t.done ? 'var(--lum-success)' : 'var(--lum-muted)', flexShrink: 0 }} />
                  <span style={{ fontSize: '.82rem', color: t.done ? 'var(--lum-muted)' : 'var(--lum-text)',
                    textDecoration: t.done ? 'line-through' : 'none' }}>
                    {t.materia} · {t.titulo}
                  </span>
                </div>
              ))
            )}
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
