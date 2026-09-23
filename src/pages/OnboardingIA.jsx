import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import api from '../api/axios'

const ID_TO_NAME = {
  mat: 'Matemáticas', bio: 'Biología', fis: 'Física', qui: 'Química',
  pro: 'Programación', his: 'Historia', len: 'Lengua', ing: 'Inglés'
}

export default function OnboardingIA() {
  const location = useLocation()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    // Cargar materias para saber sus IDs reales
    api.get('/subjects').then(res => {
      setSubjects(res.data.data)
    }).catch(err => console.error(err))
  }, [])

  const handleFinish = async (e) => {
    e.preventDefault()
    if (saving) return
    setSaving(true)

    const selectedSubjects = location.state?.selectedSubjects || []
    const niveles = location.state?.niveles || {}

    // Mapear los IDs del frontend a los IDs del backend
    const payload = selectedSubjects.map(shortId => {
      const name = ID_TO_NAME[shortId]
      const subject = subjects.find(s => s.name === name)
      return {
        id: subject?.id,
        level: niveles[shortId] || 0
      }
    }).filter(s => s.id) // remover no encontrados

    try {
      if (payload.length > 0) {
        await api.post('/user/subjects', { subjects: payload })
      }
      navigate('/salon')
    } catch (err) {
      console.error(err)
      setSaving(false)
    }
  }

  return (
    <AuthLayout>
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="badge-pill badge-success">PASO 04 · TUTORA IA</div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              width: n <= 4 ? 28 : 8, height: 8, borderRadius: 4,
              background: n <= 4 ? 'var(--lum-primary)' : 'rgba(255,255,255,.1)',
              transition: 'width .3s'
            }} />
          ))}
        </div>
      </div>

      <div className="text-center mb-4 mt-2">
        <div className="pulse-orb" style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 30px rgba(108,99,255,.4)', fontSize: '2rem', color: '#fff'
        }}>
          <i className="bi bi-robot" />
        </div>
        <h2 style={{ fontWeight: 800, fontSize: '1.8rem', color: '#fff', marginBottom: 6 }}>
          Conoce a Nexa
        </h2>
        <p style={{ color: 'var(--lum-muted)', fontSize: '.9rem', margin: 0 }}>
          Tu tutora personal, disponible 24/7.
        </p>
      </div>

      <div className="d-flex flex-column gap-3 mb-5">
        {[
          { icon: 'bi-brain', title: 'Adaptabilidad extrema', desc: 'Si no entiendes algo, buscaré 10 formas distintas de explicarlo.' },
          { icon: 'bi-clock-history', title: 'Memoria a largo plazo', desc: 'Recordaré tus dudas de hace 3 meses para conectarlas con nuevos temas.' },
          { icon: 'bi-emoji-smile-fill', title: 'Cero juicios', desc: 'Puedes preguntar la misma cosa 20 veces. Mi paciencia es infinita.' },
        ].map((item, i) => (
          <div key={i} className="d-flex gap-3 align-items-start p-3" style={{ background: 'rgba(255,255,255,.02)', borderRadius: 12, border: '1px solid var(--lum-border)' }}>
            <i className={`bi ${item.icon}`} style={{ fontSize: '1.2rem', color: 'var(--lum-primary2)', marginTop: 2 }} />
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '.9rem', marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--lum-muted)' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <Link to="/onboarding/nivel" state={location.state} className="btn-lum btn-lum-ghost" style={{ padding: '11px 24px' }}>
          <i className="bi bi-arrow-left me-1" /> Atrás
        </Link>
        <button onClick={handleFinish} disabled={saving || subjects.length === 0} className="btn-lum btn-lum-primary" style={{ padding: '11px 28px', border: 'none' }}>
          {saving ? 'Guardando...' : 'Empezar a aprender'} <i className="bi bi-rocket-takeoff-fill ms-2" />
        </button>
      </div>
    </AuthLayout>
  )
}
