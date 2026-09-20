import Sidebar from '../components/Sidebar'

export default function DashboardLayout({ children, breadcrumb, title, subtitle, rightElement }) {
  return (
    <div className="lum-layout">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Sidebar />

      <main className="lum-content">
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="mb-1" style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>
            {breadcrumb.toUpperCase()}
          </div>
        )}

        {/* Header */}
        {(title || subtitle || rightElement) && (
          <div className="d-flex align-items-center justify-content-between mb-4 fade-up">
            <div>
              {title && <h1 style={{ fontWeight: 800, fontSize: '1.7rem', color: '#fff', marginBottom: 2 }}>{title}</h1>}
              {subtitle && <p style={{ color: 'var(--lum-muted)', fontSize: '.9rem', margin: 0 }}>{subtitle}</p>}
            </div>
            {rightElement && <div>{rightElement}</div>}
          </div>
        )}

        {/* Main Content */}
        {children}
      </main>
    </div>
  )
}
