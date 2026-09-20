import { NavLink, useNavigate } from 'react-router-dom'

export default function Sidebar() {
  const navigate = useNavigate()

  function cerrarSesion() {
    // Aquí irá la lógica de logout cuando haya auth real
    navigate('/login')
  }

  return (
    <aside className="lum-sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">L</div>
        <span>Lumirai IA</span>
      </div>

      <ul className="sidebar-nav">
        <li>
          <NavLink to="/salon" end className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="bi bi-house-door-fill" />
            Salón de clases
          </NavLink>
        </li>
        <li>
          <NavLink to="/salon/vivo" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="bi bi-camera-video-fill" />
            Clases en vivo
          </NavLink>
        </li>
        <li>
          <NavLink to="/salon/nivel" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="bi bi-mortarboard-fill" />
            Nivel educativo
          </NavLink>
        </li>
        <li>
          <NavLink to="/salon/evaluaciones" className={({ isActive }) => isActive ? 'active' : ''}>
            <i className="bi bi-clipboard2-check-fill" />
            Evaluaciones
          </NavLink>
        </li>
      </ul>

      {/* User card */}
      <div className="sidebar-user">
        <div className="d-flex align-items-center gap-2">
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg,#6c63ff,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '.85rem', color: '#fff', flexShrink: 0
          }}>S</div>
          <div>
            <div className="name">Sofía Martínez</div>
            <div className="level">
              <span className="badge-pill badge-primary me-1">RACHA · 12 DÍAS</span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="d-flex justify-content-between mb-1" style={{ fontSize: '.72rem', color: 'var(--lum-muted)' }}>
            <span>INTERMEDIO</span><span>68%</span>
          </div>
          <div className="lum-progress">
            <div className="lum-progress-fill" style={{ width: '68%' }} />
          </div>
        </div>

        {/* Botón cerrar sesión */}
        <button
          onClick={cerrarSesion}
          style={{
            marginTop: 12, width: '100%', display: 'flex', alignItems: 'center',
            gap: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(239,68,68,.25)',
            background: 'rgba(239,68,68,.07)', color: '#ef4444', cursor: 'pointer',
            fontSize: '.82rem', fontWeight: 600, transition: 'all .18s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,.07)'}
        >
          <i className="bi bi-box-arrow-left" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
