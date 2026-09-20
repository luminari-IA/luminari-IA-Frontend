import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const COOKIE_KEY = 'lumirai_terms_accepted'

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((acc, c) => {
    const [k, v] = c.split('=')
    return k === name ? v : acc
  }, null)
}

export default function TermsModal() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!getCookie(COOKIE_KEY)) {
      setVisible(true)
    }
  }, [])

  function accept() {
    setCookie(COOKIE_KEY, 'true', 365)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Overlay */}
      <div style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)',
        backdropFilter: 'blur(6px)', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
      }}>
        <div className="lum-card fade-up" style={{
          maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24,
          border: '1px solid rgba(108,99,255,.3)',
          boxShadow: '0 24px 80px rgba(0,0,0,.6), 0 0 40px rgba(108,99,255,.15)'
        }}>
          {/* Logo */}
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="logo-icon">L</div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Lumirai IA</span>
          </div>

          <h2 style={{ fontWeight: 800, fontSize: '1.35rem', color: '#fff', marginBottom: 8 }}>
            Antes de continuar
          </h2>
          <p style={{ color: 'var(--lum-muted)', fontSize: '.88rem', lineHeight: 1.6, marginBottom: 20 }}>
            Para usar Lumirai IA debes aceptar nuestros términos y condiciones y política de privacidad.
          </p>

          {/* Resumen términos */}
          <div style={{
            background: 'rgba(255,255,255,.03)', border: '1px solid var(--lum-border)',
            borderRadius: 10, padding: 16, maxHeight: 180, overflowY: 'auto', marginBottom: 20
          }}>
            {[
              { icon: 'bi-shield-lock-fill', color: 'var(--lum-success)',  title: 'Cifrado de extremo a extremo', desc: 'Tus datos y conversaciones están protegidos con AES-256.' },
              { icon: 'bi-cpu-fill',         color: 'var(--lum-primary2)', title: 'IA responsable',               desc: 'No usamos tus conversaciones para entrenar modelos sin consentimiento.' },
              { icon: 'bi-person-lock',      color: 'var(--lum-accent)',   title: 'Control de datos',             desc: 'Puedes solicitar la eliminación de tu cuenta y datos en cualquier momento.' },
              { icon: 'bi-eye-slash-fill',   color: 'var(--lum-warning)',  title: 'Sin publicidad',               desc: 'No vendemos ni compartimos tu información con terceros para fines publicitarios.' },
            ].map((item, i) => (
              <div key={i} className="d-flex gap-3 mb-3">
                <i className={`bi ${item.icon}`} style={{ color: item.color, fontSize: '1rem', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '.82rem', color: '#fff', marginBottom: 1 }}>{item.title}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--lum-muted)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '.78rem', color: 'var(--lum-muted)', marginBottom: 20 }}>
            Al aceptar confirmas que has leído y aceptas nuestros{' '}
            <Link to="/" style={{ color: 'var(--lum-primary2)', textDecoration: 'none' }}>Términos de Servicio</Link>
            {' '}y{' '}
            <Link to="/" style={{ color: 'var(--lum-primary2)', textDecoration: 'none' }}>Política de Privacidad</Link>.
            Esta preferencia se guardará en tu dispositivo.
          </p>

          <div className="d-flex gap-3">
            <button
              onClick={accept}
              className="btn-lum btn-lum-primary flex-grow-1 justify-content-center"
              style={{ padding: '12px' }}
            >
              <i className="bi bi-check-lg me-1" /> Acepto y continúo
            </button>
            <a
              href="https://www.google.com"
              className="btn-lum btn-lum-ghost"
              style={{ padding: '12px 18px' }}
            >
              Salir
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
