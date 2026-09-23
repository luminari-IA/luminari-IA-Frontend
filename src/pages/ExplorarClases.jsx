import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../api/axios'

export default function ExplorarClases() {
  const [available, setAvailable] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchAvailable()
  }, [])

  const fetchAvailable = () => {
    setLoading(true)
    api.get('/subjects/available')
      .then(res => {
        const colors = ['#6c63ff', '#00d4ff', '#f59e0b', '#22c55e']
        const data = res.data.data.map((m, i) => ({
          ...m,
          color: colors[i % colors.length]
        }))
        setAvailable(data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  const handleAdd = async (subjectId) => {
    if (adding) return
    setAdding(subjectId)
    try {
      await api.post('/user/subjects', {
        subjects: [{ id: subjectId, level: 0 }]
      })
      // Remover de la lista disponible
      setAvailable(prev => prev.filter(s => s.id !== subjectId))
    } catch (err) {
      console.error('Error adding subject', err)
    } finally {
      setAdding(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 style={{ fontWeight: 800, fontSize: '1.8rem', color: '#fff', margin: 0 }}>
          Explorar Clases
        </h1>
        <Link to="/salon" className="btn-lum btn-lum-ghost">
          <i className="bi bi-arrow-left me-2" /> Volver al Salón
        </Link>
      </div>

      <p style={{ color: 'var(--lum-muted)' }}>
        Descubre nuevas materias para agregar a tu plan de estudio. Nexa se adaptará a tu nivel automáticamente.
      </p>

      {loading ? (
        <div className="text-center py-5" style={{ color: 'var(--lum-muted)' }}>
          <i className="bi bi-arrow-repeat spin-anim me-2" /> Cargando catálogo...
        </div>
      ) : available.length === 0 ? (
        <div className="text-center py-5 lum-card" style={{ background: 'rgba(255,255,255,.02)', border: '1px solid var(--lum-border)' }}>
          <i className="bi bi-check-circle-fill text-success mb-3" style={{ fontSize: '2rem' }} />
          <h4 style={{ color: '#fff', fontWeight: 700 }}>¡Estás con todo!</h4>
          <p style={{ color: 'var(--lum-muted)', margin: 0 }}>Ya estás inscrito en todas las materias disponibles actualmente.</p>
        </div>
      ) : (
        <div className="row g-3">
          {available.map(materia => (
            <div className="col-12 col-md-6 col-lg-4" key={materia.id}>
              <div className="lum-card p-4 h-100 d-flex flex-column" style={{ background: 'rgba(255,255,255,.02)', border: '1px solid var(--lum-border)' }}>
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: `${materia.color}20`, color: materia.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                  }}>
                    <i className="bi bi-book-fill" />
                  </div>
                </div>
                <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '8px' }}>
                  {materia.name}
                </h4>
                <p style={{ color: 'var(--lum-muted)', fontSize: '0.9rem', flex: 1 }}>
                  {materia.description || 'Domina los conceptos clave y avanza a tu propio ritmo con la ayuda de Nexa.'}
                </p>
                <button
                  onClick={() => handleAdd(materia.id)}
                  disabled={adding === materia.id}
                  className="btn-lum mt-3 w-100"
                  style={{
                    background: `${materia.color}20`,
                    color: materia.color,
                    border: 'none',
                    fontWeight: 600
                  }}
                >
                  {adding === materia.id ? 'Agregando...' : 'Agregar a mis clases'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
