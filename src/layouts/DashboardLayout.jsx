import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Logo from '../components/ui/Logo'

export default function DashboardLayout({ children, breadcrumb, title, subtitle, rightElement }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="lum-layout">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      
      {/* Overlay for mobile sidebar */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'show' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lum-content">
        {/* Mobile Top Bar */}
        <div className="d-flex d-lg-none align-items-center justify-content-between mb-4 glass p-3" style={{ borderRadius: 12 }}>
          <Logo />
          <button 
            className="btn-lum btn-lum-ghost" 
            style={{ padding: '6px 12px' }}
            onClick={() => setSidebarOpen(true)}
          >
            <i className="bi bi-list" style={{ fontSize: '1.5rem' }} />
          </button>
        </div>

        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="mb-1" style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>
            {breadcrumb.toUpperCase()}
          </div>
        )}

        {/* Header */}
        {(title || subtitle || rightElement) && (
          <div className="d-flex align-items-center justify-content-between mb-4 fade-up mobile-wrap">
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
