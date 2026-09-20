import { Link } from 'react-router-dom'
import Logo from '../components/ui/Logo'

export default function AuthLayout({ children, leftPanelContent }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--lum-bg)', display: 'flex' }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Left panel (optional, for Login/Register) */}
      {leftPanelContent && (
        <div className="d-none d-lg-flex flex-column justify-content-between p-5"
          style={{ width: 480, background: 'var(--lum-surface)', borderRight: '1px solid var(--lum-border)', position: 'relative', zIndex: 1 }}>
          <Logo />
          <div>{leftPanelContent}</div>
          <div style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Centro de ayuda</Link>
            {' · '}
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidad</Link>
            {' · '}
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Términos</Link>
          </div>
        </div>
      )}

      {/* Right panel / Main content */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: leftPanelContent ? 420 : 560 }} className="fade-up">
          {/* Logo on top if there is no left panel (e.g. Onboarding) */}
          {!leftPanelContent && (
            <div className="mb-4">
              <Logo />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
