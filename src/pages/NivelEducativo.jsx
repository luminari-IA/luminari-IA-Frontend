import { Link } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'

export default function NivelEducativo() {
  return (
    <DashboardLayout
      breadcrumb="LUMIRAI / NIVEL EDUCATIVO"
      title="Ruta de Aprendizaje"
      subtitle="Secundaria Avanzada · 4.º Año"
    >
      <div className="lum-card p-4 mb-4" style={{ border: '1px solid rgba(108,99,255,.25)' }}>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <div className="badge-pill badge-primary mb-2">SECUNDARIA AVANZADA · 4.º</div>
            <p style={{ color: 'var(--lum-muted)', fontSize: '.88rem', margin: 0 }}>
              Has completado 14 de 21 competencias clave para tu nivel.
            </p>
          </div>
          <div className="text-center">
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--lum-primary2)' }}>68%</div>
            <div style={{ fontSize: '.72rem', color: 'var(--lum-muted)', fontWeight: 700 }}>DOMINIO DEL CURSO</div>
          </div>
        </div>
        <div className="lum-progress" style={{ height: 12 }}>
          <div className="lum-progress-fill" style={{ width: '68%' }} />
        </div>
      </div>

      <h5 style={{ fontWeight: 800, color: '#fff', marginBottom: 20 }}>Módulos actuales</h5>
      
      <div className="row g-4">
        {[
          { 
            tipo: 'OBLIGATORIO', titulo: 'Geometría Analítica', 
            desc: 'Cónicas, vectores en el plano y aplicaciones físicas.',
            color: '#6c63ff', pct: 40 
          },
          { 
            tipo: 'PROFUNDIZACIÓN', titulo: 'Física Clásica Avanzada', 
            desc: 'Leyes de Newton, trabajo, energía y cantidad de movimiento.',
            color: '#00d4ff', pct: 85 
          },
          { 
            tipo: 'RECURSO', titulo: 'Laboratorio Virtual de Química', 
            desc: 'Simulador de estequiometría y reacciones.',
            color: '#22c55e', pct: 15 
          },
          { 
            tipo: 'TRANSVERSAL', titulo: 'Pensamiento Crítico', 
            desc: 'Análisis de fuentes, sesgos cognitivos y argumentación lógica.',
            color: '#f59e0b', pct: 0 
          },
        ].map((m, i) => (
          <div className="col-md-6" key={i}>
            <div className="lum-card p-4 h-100" style={{ borderLeft: `4px solid ${m.color}` }}>
              <div style={{ fontSize: '.72rem', fontWeight: 700, color: m.color, marginBottom: 8, letterSpacing: '.05em' }}>
                {m.tipo}
              </div>
              <h5 style={{ fontWeight: 700, color: '#fff', fontSize: '1.05rem', marginBottom: 8 }}>{m.titulo}</h5>
              <p style={{ fontSize: '.85rem', color: 'var(--lum-muted)', marginBottom: 20, lineHeight: 1.6 }}>
                {m.desc}
              </p>
              <div className="d-flex align-items-center justify-content-between mt-auto">
                <div style={{ flexGrow: 1, marginRight: 20 }}>
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>
                    <span>Progreso</span><span>{m.pct}%</span>
                  </div>
                  <div className="lum-progress">
                    <div className="lum-progress-fill" style={{ width: `${m.pct}%`, background: m.color }} />
                  </div>
                </div>
                <button className="btn-lum btn-lum-ghost" style={{ padding: '8px 16px', fontSize: '.8rem' }}>
                  Entrar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
