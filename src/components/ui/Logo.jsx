import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`d-flex align-items-center gap-2 text-decoration-none ${className}`}>
      <div className="logo-icon">L</div>
      <span style={{ fontWeight: 800, color: 'var(--lum-white)' }}>Luminary IA</span>
    </Link>
  )
}
