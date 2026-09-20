import DashboardLayout from '../layouts/DashboardLayout'

const EVALUACIONES = [
  { materia: 'Matemáticas', tema: 'Funciones cuadráticas', estado: 'pendiente',  fecha: 'Hoy',        puntos: '-', color: '#00d4ff' },
  { materia: 'Física',      tema: 'Cinemática básica',     estado: 'completada', fecha: 'Ayer',       puntos: '92', color: '#6c63ff' },
  { materia: 'Química',     tema: 'Enlaces covalentes',    estado: 'completada', fecha: '15 de sep',  puntos: '78', color: '#f59e0b' },
]

export default function Evaluaciones() {
  return (
    <DashboardLayout
      breadcrumb="LUMIRAI / EVALUACIONES"
      title="Tus Evaluaciones"
      subtitle="Aquí encontrarás pruebas adaptativas generadas por Nexa."
    >
      <div className="row g-4 mt-2">
        <div className="col-lg-8">
          <div className="lum-card p-4">
            <h5 style={{ fontWeight: 800, color: '#fff', marginBottom: 20 }}>Historial y pendientes</h5>
            
            <div className="d-flex flex-column gap-3">
              {EVALUACIONES.map((ev, i) => (
                <div key={i} className="p-3" style={{ 
                  borderRadius: 12, border: '1px solid var(--lum-border)', 
                  background: ev.estado === 'pendiente' ? 'rgba(108,99,255,.05)' : 'rgba(255,255,255,.02)' 
                }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: `${ev.color}15`, border: `1px solid ${ev.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: ev.color, fontSize: '1.2rem'
                      }}>
                        {ev.estado === 'pendiente' ? <i className="bi bi-pencil-square" /> : <i className="bi bi-check-lg" />}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '.95rem' }}>{ev.tema}</div>
                        <div style={{ fontSize: '.8rem', color: 'var(--lum-muted)' }}>
                          {ev.materia} · {ev.fecha}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-end">
                      {ev.estado === 'pendiente' ? (
                        <button className="btn-lum btn-lum-primary" style={{ padding: '8px 20px', fontSize: '.85rem' }}>
                          Comenzar
                        </button>
                      ) : (
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{ev.puntos}</div>
                          <div style={{ fontSize: '.7rem', color: 'var(--lum-muted)' }}>PUNTOS</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="lum-card p-4" style={{ background: 'linear-gradient(145deg, var(--lum-card) 0%, rgba(108,99,255,.1) 100%)' }}>
            <div className="text-center mb-4">
              <i className="bi bi-shield-check" style={{ fontSize: '3rem', color: 'var(--lum-primary2)' }} />
              <h5 style={{ fontWeight: 800, color: '#fff', marginTop: 12 }}>Evaluaciones sin estrés</h5>
              <p style={{ color: 'var(--lum-muted)', fontSize: '.85rem', lineHeight: 1.6 }}>
                En Lumirai, una mala nota no es un fracaso, es información. Nexa usa tus respuestas para entender qué temas necesitas reforzar y adapta tu ruta de aprendizaje automáticamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
