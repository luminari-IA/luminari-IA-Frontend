import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'

// Simulador de transcripción en tiempo real
const TRANSCRIPT = [
  { time: '16:30', who: 'Profe. Alex', text: 'Bienvenidos todos. Hoy hablaremos del movimiento armónico simple.' },
  { time: '16:32', who: 'Profe. Alex', text: 'Imaginen un péndulo. La fuerza que lo hace volver a su posición central es proporcional a...' },
  { time: '16:33', who: 'Sofía',       text: '¿A la distancia desde el centro?' },
  { time: '16:33', who: 'Profe. Alex', text: '¡Exacto, Sofía! A eso se le llama fuerza restauradora.' },
]

export default function ClasesEnVivo() {
  const [duda, setDuda] = useState('')

  return (
    <DashboardLayout
      breadcrumb="LUMIRAI / CLASES EN VIVO"
      title="Física: Movimiento armónico"
      subtitle="Profesor Alex Rivera · 8 estudiantes conectados"
      rightElement={
        <div className="badge-pill badge-primary">
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block', marginRight: 6 }} />
          EN VIVO
        </div>
      }
    >
      <div className="row g-4">
        {/* Main video area */}
        <div className="col-lg-8">
          <div className="lum-card mb-4" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--lum-primary)' }}>
            <div style={{
              width: '100%', aspectRatio: '16/9', background: '#000',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              {/* Fake video placeholder */}
              <i className="bi bi-play-circle" style={{ fontSize: '4rem', color: 'rgba(255,255,255,.2)' }} />
              
              {/* Controles superpuestos */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,.8), transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div className="d-flex gap-3">
                  <button className="btn-lum btn-lum-ghost" style={{ padding: '8px 12px', background: 'rgba(255,255,255,.1)' }}>
                    <i className="bi bi-mic-mute-fill text-danger" />
                  </button>
                  <button className="btn-lum btn-lum-ghost" style={{ padding: '8px 12px', background: 'rgba(255,255,255,.1)' }}>
                    <i className="bi bi-camera-video-off-fill text-danger" />
                  </button>
                </div>
                <button className="btn-lum btn-lum-primary" style={{ background: '#ef4444', borderColor: '#ef4444', padding: '8px 16px' }}>
                  Salir de la clase
                </button>
              </div>
            </div>
          </div>

          {/* Dudas a Nexa */}
          <div className="lum-card p-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'linear-gradient(135deg,#6c63ff,#a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: '#fff', fontSize: '.8rem'
              }}>N</div>
              <div>
                <h6 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>Dudas silenciosas con Nexa</h6>
                <p style={{ color: 'var(--lum-muted)', fontSize: '.8rem', margin: 0 }}>
                  Pregunta sin interrumpir. Nexa escucha la clase y te explica en contexto.
                </p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <input 
                type="text" className="lum-input flex-grow-1"
                placeholder="Ej. ¿Por qué dijo que la gravedad no afecta el periodo de un resorte?"
                value={duda} onChange={e => setDuda(e.target.value)}
              />
              <button className="btn-lum btn-lum-primary" style={{ padding: '10px 16px' }}>
                <i className="bi bi-send-fill" />
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-lg-4">
          <div className="lum-card p-0 d-flex flex-column" style={{ height: 'calc(100% - 24px)' }}>
            <div className="p-3" style={{ borderBottom: '1px solid var(--lum-border)' }}>
              <h6 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>
                <i className="bi bi-card-text me-2" /> Transcripción en vivo
              </h6>
            </div>
            
            <div className="p-3 flex-grow-1" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {TRANSCRIPT.map((line, i) => (
                <div key={i}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span style={{ fontSize: '.75rem', fontWeight: 700, color: line.who === 'Sofía' ? 'var(--lum-primary2)' : 'var(--lum-muted)' }}>
                      {line.who.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.3)' }}>{line.time}</span>
                  </div>
                  <div style={{ fontSize: '.85rem', color: 'var(--lum-text)' }}>
                    {line.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3" style={{ borderTop: '1px solid var(--lum-border)' }}>
              <button className="btn-lum btn-lum-ghost w-100 justify-content-center" style={{ padding: '8px', fontSize: '.85rem' }}>
                <i className="bi bi-download me-2" /> Descargar apuntes automáticos
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
