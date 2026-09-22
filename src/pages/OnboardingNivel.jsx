import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'

const TODOS_LOS_INTERESES = [
  { id: 'mat', name: 'Matemáticas' },
  { id: 'bio', name: 'Biología' },
  { id: 'fis', name: 'Física' },
  { id: 'qui', name: 'Química' },
  { id: 'pro', name: 'Programación' },
  { id: 'his', name: 'Historia' },
  { id: 'len', name: 'Lengua' },
  { id: 'ing', name: 'Inglés' },
]

const NIVELES = ['Cero', 'Básico', 'Intermedio', 'Avanzado']

export default function OnboardingNivel() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Por defecto, unas cuantas materias si se navega directo sin estado
  const fallback = ['mat', 'bio', 'fis', 'qui']
  const selectedSubjects = location.state?.selectedSubjects || fallback
  
  // Filtramos la información completa basada en la selección
  const seleccion = TODOS_LOS_INTERESES.filter(m => selectedSubjects.includes(m.id))

  // Inicializar estado de niveles solo con las materias seleccionadas
  const initialNiveles = {}
  seleccion.forEach(m => initialNiveles[m.id] = 0)
  
  const [niveles, setNiveles] = useState(initialNiveles)

  // Redirect a intereses si no hay nada seleccionado (opcional, pero útil)
  useEffect(() => {
    if (!location.state?.selectedSubjects || location.state.selectedSubjects.length === 0) {
      navigate('/onboarding/intereses')
    }
  }, [location, navigate])

  const updateNivel = (id, n) => { setNiveles(p => ({ ...p, [id]: n })) }

  return (
    <AuthLayout>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="badge-pill badge-warning">PASO 03 · NIVEL ACTUAL</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              width: n <= 3 ? 28 : 8, height: 8, borderRadius: 4,
              background: n <= 3 ? 'var(--lum-primary)' : 'rgba(255,255,255,.1)',
              transition: 'width .3s'
            }} />
          ))}
        </div>
      </div>

      <h2 style={{ fontWeight: 800, fontSize: '1.8rem', color: '#fff', marginBottom: 6 }}>
        ¿Dónde nos encontramos?
      </h2>
      <p style={{ color: 'var(--lum-muted)', fontSize: '.9rem', marginBottom: 24 }}>
        Sé honesto. Nexa preparará una evaluación inicial para confirmar, pero esto nos da un excelente punto de partida.
      </p>

      <div className="d-flex flex-column gap-3 mb-4">
        {seleccion.map(m => (
          <div key={m.id} className="lum-card p-3" style={{ background: 'rgba(255,255,255,.02)', border: '1px solid var(--lum-border)' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span style={{ fontWeight: 700, color: '#fff', fontSize: '.95rem' }}>{m.name}</span>
              <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--lum-primary2)' }}>
                {NIVELES[niveles[m.id] || 0].toUpperCase()}
              </span>
            </div>
            
            {/* Slider de nivel */}
            <div className="d-flex gap-2">
              {NIVELES.map((n, i) => {
                const on = i <= (niveles[m.id] || 0)
                const current = i === (niveles[m.id] || 0)
                return (
                  <button
                    key={n} onClick={() => updateNivel(m.id, i)}
                    style={{
                      flex: 1, height: 12, borderRadius: 6, border: 'none',
                      background: on ? 'var(--lum-primary)' : 'rgba(255,255,255,.1)',
                      opacity: on && !current ? 0.5 : 1,
                      cursor: 'pointer', transition: 'all .2s'
                    }}
                    title={n}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="lum-card p-3 mb-4" style={{ background: 'rgba(245,158,11,.06)', border: '1px solid rgba(245,158,11,.25)' }}>
        <div className="d-flex gap-3">
          <i className="bi bi-lightbulb-fill" style={{ color: 'var(--lum-warning)', fontSize: '1.2rem', marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 700, color: 'var(--lum-warning)', fontSize: '.85rem' }}>Dato curioso</div>
            <p style={{ color: 'var(--lum-muted)', fontSize: '.8rem', margin: 0, marginTop: 4 }}>
              El 60% de los estudiantes subestima su nivel en ciencias. No te preocupes por equivocarte, Luminary se ajustará en tiempo real.
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <Link to="/onboarding/intereses" state={{ selectedSubjects }} className="btn-lum btn-lum-ghost" style={{ padding: '11px 24px' }}>
          <i className="bi bi-arrow-left me-1" /> Atrás
        </Link>
        <Link to="/onboarding/ia" state={{ selectedSubjects, niveles }} className="btn-lum btn-lum-primary" style={{ padding: '11px 28px' }}>
          Conocer a mi tutora <i className="bi bi-arrow-right ms-1" />
        </Link>
      </div>
    </AuthLayout>
  )
}
