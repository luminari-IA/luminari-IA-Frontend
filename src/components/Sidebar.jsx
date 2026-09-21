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


  return (
    <aside className={`lum-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="sidebar-logo mb-0">
          <div className="logo-icon">L</div>
          <span>Luminary IA</span>
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
        {user?.role !== 'admin' && (
          <>
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
              <NavLink to="/salon/evaluaciones" onClick={onClose} className={({ isActive }) => `lum-nav-link ${isActive ? 'active' : ''}`}>
                <i className="bi bi-file-earmark-check" /> Evaluaciones
              </NavLink>
            </li>
          </>
        )}

        {user?.role === 'admin' && (
          <li style={{ marginTop: user?.role === 'admin' ? '0' : '2rem' }}>
            <NavLink to="/admin" onClick={onClose} className={({ isActive }) => `lum-nav-link ${isActive ? 'active' : ''}`} style={{ color: 'var(--lum-primary2)' }}>
              <i className="bi bi-shield-lock" /> Panel de Admin
            </NavLink>
          </li>
        )}
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
              <span className="badge-pill badge-primary me-1">{user?.role === 'admin' ? 'CREADOR' : 'ESTUDIANTE'}</span>
            </div>
          </div>
        </div>

        {/* Botón ver como estudiante (solo admin) */}
        {user?.role === 'admin' && (
          <button
            onClick={() => window.open('/salon?viewAsStudent=true', '_blank')}
            style={{
              marginTop: 16, width: '100%', display: 'flex', alignItems: 'center',
              gap: 8, padding: '8px 10px', borderRadius: 8, border: '1px solid var(--lum-border)',
              background: 'rgba(255,255,255,.05)', color: 'var(--lum-text)', cursor: 'pointer',
              fontSize: '.82rem', fontWeight: 600, transition: 'all .18s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--lum-primary)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
          >
            <i className="bi bi-person-video3" />
            Ver como estudiante
          </button>
        )}

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
