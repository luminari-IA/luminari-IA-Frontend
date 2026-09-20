import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  function cerrarSesion() {
    logout()
    navigate('/login')
  }

  // Obtener inicial del usuario (o 'L' si no hay nombre)
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'L'
  const userName = user?.name || 'Estudiante'
  const planName = user?.plan || 'BÁSICO'

  return (
    <aside className={`lum-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="sidebar-logo mb-0">
          <div className="logo-icon">L</div>
          <span>Lumirai IA</span>
        </div>
        <button 
          className="d-lg-none btn-lum btn-lum-ghost" 
          style={{ padding: '4px 8px', border: 'none' }}
          onClick={onClose}
        >
          <i className="bi bi-x-lg" style={{ fontSize: '1.2rem' }} />
        </button>
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
          }}>{initial}</div>
          <div>
            <div className="name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>{userName}</div>
            <div className="level">
              <span className="badge-pill badge-primary me-1">PLAN {planName.toUpperCase()}</span>
            </div>
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
