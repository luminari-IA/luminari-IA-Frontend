import { Link } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'

export default function Login() {
  const leftPanel = (
    <>
      <div className="badge-pill badge-accent mb-4">CONTINUIDAD SIN FRICCIÓN</div>
      <h2 style={{ fontWeight: 800, fontSize: '2rem', color: '#fff', lineHeight: 1.25, marginBottom: 16 }}>
        Vuelve al punto exacto donde tu curiosidad quedó abierta.
      </h2>
      <p style={{ color: 'var(--lum-muted)', lineHeight: 1.7 }}>
        Tus materias, progreso y conversaciones con Nexa te esperan.
      </p>
      <p style={{ color: 'var(--lum-primary2)', fontStyle: 'italic', fontSize: '.9rem', marginTop: 16 }}>
        "Entender también es recordar por qué empezaste."
      </p>
    </>
  )

  return (
    <AuthLayout leftPanelContent={leftPanel}>
      <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff', marginBottom: 4 }}>Bienvenida de nuevo</h3>
      <p style={{ color: 'var(--lum-muted)', marginBottom: 28, fontSize: '.9rem' }}>
        Inicia sesión para continuar en tu salón.
      </p>

      <button className="btn-lum btn-lum-ghost w-100 justify-content-center mb-4" style={{ padding: '12px' }}>
        <i className="bi bi-google me-2" /> Continuar con Google
      </button>

      <div className="d-flex align-items-center gap-3 mb-4">
        <hr style={{ flex: 1, borderColor: 'var(--lum-border)' }} />
        <span style={{ color: 'var(--lum-muted)', fontSize: '.75rem', whiteSpace: 'nowrap' }}>O USA TU CORREO</span>
        <hr style={{ flex: 1, borderColor: 'var(--lum-border)' }} />
      </div>

      <div className="d-flex flex-column gap-3 mb-2">
        <div>
          <label className="d-block mb-1" style={{ fontSize: '.8rem', color: 'var(--lum-muted)', fontWeight: 600 }}>
            Correo electrónico
          </label>
          <input type="email" className="lum-input" placeholder="sofia@correo.com" />
        </div>
        <div>
          <div className="d-flex justify-content-between mb-1">
            <label style={{ fontSize: '.8rem', color: 'var(--lum-muted)', fontWeight: 600 }}>Contraseña</label>
            <Link to="/" style={{ fontSize: '.78rem', color: 'var(--lum-primary2)', textDecoration: 'none' }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input type="password" className="lum-input" placeholder="••••••••••••" />
        </div>
      </div>

      <Link to="/salon" className="btn-lum btn-lum-primary w-100 justify-content-center mt-4" style={{ padding: '13px' }}>
        Entrar a Lumirai <i className="bi bi-arrow-right ms-1" />
      </Link>

      <p className="text-center mt-4" style={{ fontSize: '.85rem', color: 'var(--lum-muted)' }}>
        ¿Primera vez aquí?{' '}
        <Link to="/registro" style={{ color: 'var(--lum-primary2)', textDecoration: 'none', fontWeight: 600 }}>
          Crear cuenta
        </Link>
      </p>
    </AuthLayout>
  )
}
