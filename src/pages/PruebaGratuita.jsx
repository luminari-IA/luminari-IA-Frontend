import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'

// Simula la tutora Nexa en modo demo
const DEMO_CHAT = [
  { who: 'nexa', msg: '¡Hola! Soy Nexa, tu tutora IA. Esta es una vista previa gratuita de Lumirai. ¿Sobre qué tema te puedo ayudar hoy?' },
]

const DEMO_MATERIAS = [
  { name: 'Matemáticas', pct: 72, color: '#6c63ff', tema: 'Funciones cuadráticas' },
  { name: 'Física',      pct: 64, color: '#00d4ff', tema: 'Movimiento armónico' },
  { name: 'Química',     pct: 48, color: '#f59e0b', tema: 'Reacciones redox' },
]

const DEMO_TAREAS = [
  { materia: 'Matemáticas', desc: 'Resuelve los ejercicios de funciones cuadráticas', due: 'Hoy', done: false },
  { materia: 'Física',      desc: 'Observa la simulación del péndulo simple',         due: 'Mañana', done: false },
]

const TABS = ['salón', 'tutora', 'evaluación', 'nivel']

export default function PruebaGratuita() {
  const [tab, setTab] = useState('salón')
  const [messages, setMessages] = useState(DEMO_CHAT)
  const [input, setInput] = useState('')

  function sendMsg() {
    if (!input.trim()) return
    const userMsg = { who: 'sofia', msg: input }
    const nexaResp = { who: 'nexa', msg: 'Entendido, déjame preparar una explicación clara sobre ese tema. En la versión completa recibirías una ruta de aprendizaje personalizada con ejercicios adaptativos. 💡' }
    setMessages(prev => [...prev, userMsg, nexaResp])
    setInput('')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--lum-bg)' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Top bar */}
      <nav className="glass d-flex align-items-center justify-content-between px-4 py-3" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="d-flex align-items-center gap-2">
          <Logo />
          <span className="badge-pill badge-warning ms-2">PRUEBA GRATUITA</span>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <span style={{ fontSize: '.82rem', color: 'var(--lum-muted)' }}>
            <i className="bi bi-lock-fill me-1" /> Las clases en vivo requieren cuenta
          </span>
          <Link to="/registro" className="btn-lum btn-lum-primary" style={{ padding: '8px 20px' }}>
            Crear cuenta gratis <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>
      </nav>

      {/* Tab bar */}
      <div className="d-flex gap-2 px-4 py-3" style={{ 
        borderBottom: '1px solid var(--lum-border)', position: 'sticky', top: 57, zIndex: 99, 
        background: 'var(--lum-bg)', overflowX: 'auto', whiteSpace: 'nowrap' 
      }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: '.85rem',
            cursor: 'pointer', transition: 'all .18s', textTransform: 'capitalize',
            border: tab === t ? '1px solid var(--lum-primary)' : '1px solid var(--lum-border)',
            background: tab === t ? 'rgba(108,99,255,.15)' : 'transparent',
            color: tab === t ? 'var(--lum-primary2)' : 'var(--lum-muted)',
          }}>
            {t === 'salón' && <i className="bi bi-house-door me-1" />}
            {t === 'tutora' && <i className="bi bi-cpu me-1" />}
            {t === 'evaluación' && <i className="bi bi-clipboard2-check me-1" />}
            {t === 'nivel' && <i className="bi bi-mortarboard me-1" />}
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        {/* Clases en vivo — bloqueado */}
        <button style={{
          padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: '.85rem',
          cursor: 'not-allowed', border: '1px solid var(--lum-border)',
          background: 'transparent', color: 'rgba(255,255,255,.2)',
        }}>
          <i className="bi bi-lock-fill me-1" /> Clases en vivo
        </button>
      </div>

      <div className="container py-4" style={{ position: 'relative', zIndex: 1 }}>
        {/* Banner demo */}
        <div className="lum-card p-3 mb-4 d-flex align-items-center gap-3 fade-up"
          style={{ background: 'rgba(245,158,11,.06)', border: '1px solid rgba(245,158,11,.25)' }}>
          <i className="bi bi-stars" style={{ color: 'var(--lum-warning)', fontSize: '1.3rem', flexShrink: 0 }} />
          <div className="flex-grow-1">
            <span style={{ fontWeight: 700, color: 'var(--lum-warning)', fontSize: '.88rem' }}>Modo demostración</span>
            <span style={{ color: 'var(--lum-muted)', fontSize: '.82rem', marginLeft: 8 }}>
              Estás explorando Lumirai sin cuenta. Los datos son de ejemplo y no se guardan.
            </span>
          </div>
          <Link to="/registro" style={{ color: 'var(--lum-primary2)', fontSize: '.82rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Activar cuenta →
          </Link>
        </div>

        {/* ===== TAB: SALÓN ===== */}
        {tab === 'salón' && (
          <div className="row g-4 fade-up">
            <div className="col-lg-8">
              <div className="lum-card p-4 mb-4">
                <h5 style={{ fontWeight: 700, color: '#fff', marginBottom: 20 }}>Tu progreso (demo)</h5>
                {DEMO_MATERIAS.map((m, i) => (
                  <div key={i} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ fontWeight: 600, color: '#fff', fontSize: '.88rem' }}>{m.name}</span>
                      <span style={{ color: m.color, fontWeight: 700, fontSize: '.85rem' }}>{m.pct}%</span>
                    </div>
                    <div style={{ fontSize: '.75rem', color: 'var(--lum-muted)', marginBottom: 4 }}>{m.tema}</div>
                    <div className="lum-progress">
                      <div className="lum-progress-fill" style={{ width: `${m.pct}%`, background: `linear-gradient(90deg,${m.color},${m.color}99)` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tareas demo */}
              <div className="lum-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>Tareas asignadas por Nexa</h5>
                  <span className="badge-pill badge-warning">2 pendientes</span>
                </div>
                {DEMO_TAREAS.map((t, i) => (
                  <div key={i} className="d-flex align-items-center justify-content-between p-3 mb-2"
                    style={{ background: 'rgba(255,255,255,.03)', borderRadius: 10, border: '1px solid var(--lum-border)' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#fff', fontSize: '.88rem', marginBottom: 2 }}>{t.materia}</div>
                      <div style={{ color: 'var(--lum-muted)', fontSize: '.8rem' }}>{t.desc}</div>
                      <div style={{ fontSize: '.72rem', color: 'var(--lum-warning)', marginTop: 4 }}>
                        <i className="bi bi-clock me-1" />{t.due}
                      </div>
                    </div>
                    <Link to="/registro" className="btn-lum btn-lum-ghost" style={{ padding: '7px 14px', fontSize: '.78rem', whiteSpace: 'nowrap' }}>
                      <i className="bi bi-lock-fill me-1" /> Entregar
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lum-card p-4" style={{ border: '1px solid rgba(108,99,255,.2)' }}>
                <div className="text-center mb-3">
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', margin: '0 auto 12px',
                    background: 'linear-gradient(135deg,#6c63ff,#a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', fontWeight: 800, color: '#fff'
                  }}>N</div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>Nexa</div>
                  <div style={{ fontSize: '.75rem', color: 'var(--lum-primary2)' }}>TUTORA IA</div>
                </div>
                <div style={{ background: 'rgba(108,99,255,.08)', borderRadius: 10, padding: 14,
                  border: '1px solid rgba(108,99,255,.2)', fontSize: '.85rem', color: 'var(--lum-text)', fontStyle: 'italic' }}>
                  "Hoy conectaremos ondas, música y movimiento. ¿Lista para aprender?"
                </div>
                <Link to="/registro" className="btn-lum btn-lum-primary w-100 justify-content-center mt-3" style={{ padding: '10px' }}>
                  Hablar con Nexa
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB: TUTORA ===== */}
        {tab === 'tutora' && (
          <div className="row g-4 fade-up">
            <div className="col-lg-8">
              <div className="lum-card d-flex flex-column" style={{ height: 480 }}>
                <div className="p-4 d-flex align-items-center gap-3" style={{ borderBottom: '1px solid var(--lum-border)' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#6c63ff,#a855f7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, color: '#fff'
                  }}>N</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff' }}>Nexa · Tutora IA</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--lum-success)' }}>
                      <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lum-success)', display: 'inline-block', marginRight: 4 }} />
                      En línea (modo demo)
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 p-4 d-flex flex-column gap-3" style={{ overflowY: 'auto' }}>
                  {messages.map((m, i) => (
                    <div key={i} className={`d-flex ${m.who === 'sofia' ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div style={{
                        maxWidth: '75%', padding: '10px 14px', borderRadius: 12, fontSize: '.87rem',
                        background: m.who === 'sofia' ? 'rgba(108,99,255,.25)' : 'rgba(255,255,255,.05)',
                        border: `1px solid ${m.who === 'sofia' ? 'rgba(108,99,255,.4)' : 'var(--lum-border)'}`,
                        color: m.who === 'sofia' ? '#fff' : 'var(--lum-text)',
                      }}>
                        {m.who === 'nexa' && <div style={{ fontSize: '.7rem', color: 'var(--lum-primary2)', fontWeight: 700, marginBottom: 4 }}>NEXA</div>}
                        {m.msg}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 d-flex gap-2" style={{ borderTop: '1px solid var(--lum-border)' }}>
                  <input
                    type="text" className="lum-input" placeholder="Escribe tu pregunta a Nexa…"
                    value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMsg()}
                    style={{ flex: 1, padding: '9px 14px' }}
                  />
                  <button className="btn-lum btn-lum-primary" style={{ padding: '9px 16px', flexShrink: 0 }} onClick={sendMsg}>
                    <i className="bi bi-send-fill" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="lum-card p-4">
                <h6 style={{ fontWeight: 700, color: '#fff', marginBottom: 12 }}>En la versión completa obtienes:</h6>
                {[
                  'Memoria contextual permanente',
                  'Rutas de aprendizaje adaptativas',
                  'Evaluaciones explicadas',
                  'Clases en vivo con Nexa',
                  'Certificaciones digitales',
                ].map((f, i) => (
                  <div key={i} className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '.85rem', color: 'var(--lum-muted)' }}>
                    <i className="bi bi-check-circle-fill" style={{ color: 'var(--lum-success)', flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
                <Link to="/registro" className="btn-lum btn-lum-primary w-100 justify-content-center mt-3" style={{ padding: '10px' }}>
                  Crear cuenta gratis
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB: EVALUACIÓN ===== */}
        {tab === 'evaluación' && (
          <div className="row g-4 fade-up">
            <div className="col-lg-8">
              <div className="lum-card p-4 mb-4">
                <div className="badge-pill badge-primary mb-3">DEMO · PREGUNTA 1 DE 3</div>
                <h5 style={{ fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                  ¿Cuál es la ecuación del movimiento armónico simple?
                </h5>
                <p style={{ color: 'var(--lum-muted)', fontSize: '.85rem', marginBottom: 20 }}>
                  Selecciona la opción correcta. Nexa te explicará el razonamiento después de responder.
                </p>
                {[
                  { label: 'A',  text: 'x(t) = A·sin(ωt + φ)', correct: true },
                  { label: 'B',  text: 'x(t) = A·e^(ωt)',       correct: false },
                  { label: 'C',  text: 'x(t) = A·cos(ωt²)',     correct: false },
                  { label: 'D',  text: 'x(t) = A·tan(ωt + φ)', correct: false },
                ].map((op, i) => (
                  <div key={i} className="d-flex align-items-center gap-3 p-3 mb-2"
                    style={{
                      background: 'rgba(255,255,255,.03)', borderRadius: 10,
                      border: '1px solid var(--lum-border)', cursor: 'pointer',
                      transition: 'all .18s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lum-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--lum-border)'}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(108,99,255,.12)', border: '1px solid rgba(108,99,255,.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, color: 'var(--lum-primary2)', fontSize: '.85rem'
                    }}>{op.label}</div>
                    <span style={{ color: 'var(--lum-text)', fontFamily: 'monospace', fontSize: '.9rem' }}>{op.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/registro" className="btn-lum btn-lum-primary" style={{ padding: '11px 24px' }}>
                <i className="bi bi-lock-fill me-1" /> Ver más preguntas — Crear cuenta
              </Link>
            </div>
            <div className="col-lg-4">
              <div className="lum-card p-4">
                <div style={{ fontSize: '.75rem', color: 'var(--lum-muted)', marginBottom: 12, fontWeight: 700 }}>PROGRESO DEMO</div>
                <div className="lum-progress mb-2"><div className="lum-progress-fill" style={{ width: '33%' }} /></div>
                <div style={{ fontSize: '.78rem', color: 'var(--lum-muted)' }}>1 de 3 preguntas</div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB: NIVEL ===== */}
        {tab === 'nivel' && (
          <div className="fade-up">
            <div className="lum-card p-4 mb-4" style={{ border: '1px solid rgba(108,99,255,.25)' }}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                  <div className="badge-pill badge-primary mb-2">SECUNDARIA AVANZADA · 4.º</div>
                  <p style={{ color: 'var(--lum-muted)', fontSize: '.88rem', margin: 0 }}>
                    Así se vería tu progreso en la versión completa.
                  </p>
                </div>
                <div className="text-center">
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--lum-primary2)' }}>68%</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--lum-muted)' }}>14 DE 21 COMPETENCIAS</div>
                </div>
              </div>
              <div className="lum-progress" style={{ height: 10 }}><div className="lum-progress-fill" style={{ width: '68%' }} /></div>
            </div>

            <div className="row g-3">
              {[
                { tipo: 'PROFUNDIZACIÓN', titulo: 'Cálculo para explorar el movimiento', meta: '6 módulos', color: '#6c63ff', icon: 'bi-bar-chart-fill' },
                { tipo: 'RECURSO', titulo: 'Atlas visual de genética', meta: '24 recursos', color: '#22c55e', icon: 'bi-book-half' },
              ].map((c, i) => (
                <div className="col-md-6" key={i}>
                  <div className="lum-card p-4" style={{ borderLeft: `3px solid ${c.color}` }}>
                    <div style={{ fontSize: '.72rem', fontWeight: 700, color: c.color, marginBottom: 8, letterSpacing: '.05em' }}>
                      {c.tipo}
                    </div>
                    <h5 style={{ fontWeight: 700, color: '#fff', fontSize: '.92rem', marginBottom: 8 }}>{c.titulo}</h5>
                    <div className="d-flex align-items-center justify-content-between">
                      <span style={{ fontSize: '.78rem', color: 'var(--lum-muted)' }}>{c.meta}</span>
                      <Link to="/registro" className="btn-lum btn-lum-ghost" style={{ padding: '6px 12px', fontSize: '.78rem' }}>
                        <i className="bi bi-lock-fill me-1" /> Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
