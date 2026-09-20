import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'

const MATERIAS = [
  { id: 'mat', name: 'Matemáticas', sub: 'Álgebra · Geometría',  icon: 'bi-calculator-fill' },
  { id: 'bio', name: 'Biología',    sub: 'Célula · Genética',    icon: 'bi-heart-pulse-fill' },
  { id: 'fis', name: 'Física',      sub: 'Mecánica · Ondas',     icon: 'bi-lightning-fill' },
  { id: 'qui', name: 'Química',     sub: 'Materia · Reacciones', icon: 'bi-capsule-pill' },
  { id: 'pro', name: 'Programación',sub: 'Python · Algoritmos',  icon: 'bi-code-slash' },
  { id: 'his', name: 'Historia',    sub: 'Moderna · Universal',  icon: 'bi-globe-americas' },
  { id: 'len', name: 'Lengua',      sub: 'Escritura · Literatura',icon: 'bi-book-fill' },
  { id: 'ing', name: 'Inglés',      sub: 'Conversación · Gramática',icon: 'bi-translate' },
]

export default function OnboardingIntereses() {
  const [selected, setSelected] = useState(['mat', 'bio', 'fis', 'qui'])

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <AuthLayout>
      {/* Step indicator */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="badge-pill badge-primary">PASO 02 · INTERESES</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              width: n <= 2 ? 28 : 8, height: 8, borderRadius: 4,
              background: n <= 2 ? 'var(--lum-primary)' : 'rgba(255,255,255,.1)',
              transition: 'width .3s'
            }} />
          ))}
        </div>
      </div>

      <h2 style={{ fontWeight: 800, fontSize: '1.8rem', color: '#fff', marginBottom: 6 }}>
        ¿Qué quieres aprender?
      </h2>
      <p style={{ color: 'var(--lum-muted)', fontSize: '.9rem', marginBottom: 8 }}>
        Selecciona varias materias. Después podrás afinar temas y niveles por separado.
      </p>
      <div className="d-flex align-items-center gap-2 mb-4">
        <span className="badge-pill badge-success">{selected.length} materias seleccionadas</span>
        <span style={{ fontSize: '.78rem', color: 'var(--lum-muted)' }}>Recomendado: 3–5 para comenzar</span>
      </div>

      {/* Grid */}
      <div className="row g-3 mb-4">
        {MATERIAS.map(m => {
          const on = selected.includes(m.id)
          return (
            <div className="col-6" key={m.id}>
              <button
                onClick={() => toggle(m.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '14px 16px',
                  borderRadius: 12, border: `1px solid ${on ? 'var(--lum-primary)' : 'var(--lum-border)'}`,
                  background: on ? 'rgba(108,99,255,.12)' : 'var(--lum-card)',
                  cursor: 'pointer', transition: 'all .18s',
                  boxShadow: on ? '0 0 0 2px rgba(108,99,255,.25)' : 'none'
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span style={{ fontWeight: 700, color: on ? '#fff' : 'var(--lum-text)', fontSize: '.92rem' }}>
                    {m.name}
                  </span>
                  {on
                    ? <i className="bi bi-check-circle-fill" style={{ color: 'var(--lum-primary2)', fontSize: '1rem' }} />
                    : <i className="bi bi-plus-circle" style={{ color: 'var(--lum-muted)', fontSize: '1rem' }} />
                  }
                </div>
                <span style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>{m.sub}</span>
              </button>
            </div>
          )
        })}
      </div>

      <div className="d-flex justify-content-between">
        <Link to="/registro" className="btn-lum btn-lum-ghost" style={{ padding: '11px 24px' }}>
          <i className="bi bi-arrow-left me-1" /> Atrás
        </Link>
        <Link to="/onboarding/nivel" className="btn-lum btn-lum-primary" style={{ padding: '11px 28px' }}>
          Definir mis niveles <i className="bi bi-arrow-right ms-1" />
        </Link>
      </div>
    </AuthLayout>
  )
}
