import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="hero-bg position-relative" style={{ minHeight: '100vh' }}>
      {/* Orbs decorativos */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Navbar */}
      <nav className="glass d-flex align-items-center justify-content-between px-4 py-3 position-relative" style={{ zIndex: 10 }}>
        <div className="d-flex align-items-center gap-2">
          <div className="logo-icon">L</div>
          <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Lumirai IA</span>
        </div>
        <div className="d-flex gap-3">
          <Link to="/login" className="btn-lum btn-lum-ghost" style={{ padding: '8px 20px' }}>
            Iniciar sesión
          </Link>
          <Link to="/registro" className="btn-lum btn-lum-primary" style={{ padding: '8px 20px' }}>
            Comenzar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="container position-relative" style={{ zIndex: 5, paddingTop: 80, paddingBottom: 80 }}>
        <div className="row align-items-center g-5">
          {/* Left */}
          <div className="col-lg-6 fade-up">
            <div className="mb-3">
              <span className="badge-pill badge-primary">
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lum-primary2)', display: 'inline-block' }} />
                APRENDIZAJE ADAPTATIVO · IA
              </span>
            </div>
            <h1 style={{ fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 20 }}>
              Tu curiosidad merece una tutora que evolucione <span style={{ background: 'linear-gradient(90deg,#6c63ff,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>contigo.</span>
            </h1>
            <p style={{ color: 'var(--lum-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 32 }}>
              Lumirai organiza tu currículo, entiende tu nivel y convierte cada duda en una ruta clara de aprendizaje.
            </p>
            <div className="d-flex flex-wrap gap-3 mb-4">
              <Link to="/registro" className="btn-lum btn-lum-primary" style={{ padding: '13px 30px', fontSize: '1rem' }}>
                <i className="bi bi-rocket-takeoff-fill" /> Comenzar
              </Link>
              <Link to="/prueba-gratuita" className="btn-lum btn-lum-ghost" style={{ padding: '13px 30px', fontSize: '1rem' }}>
                <i className="bi bi-play-circle-fill" /> Ver cómo funciona
              </Link>
            </div>
            <p style={{ fontSize: '.78rem', color: 'var(--lum-muted)' }}>
              <i className="bi bi-shield-check me-1" style={{ color: 'var(--lum-success)' }} />
              CONFIGURACIÓN EN 4 MIN · TUS DATOS, SIEMPRE BAJO CONTROL
            </p>
          </div>

          {/* Right — Mockup card */}
          <div className="col-lg-6 fade-up fade-up-d1">
            <div className="hero-mockup">
              {/* Top bar de mockup */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="badge-pill badge-accent">
                  <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lum-accent)', display: 'inline-block' }} />
                  AULA ACTIVA
                </div>
                <span style={{ fontSize: '.75rem', color: 'var(--lum-muted)' }}>MAR 19 SEP · 09:42</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: 4 }}>
                FÍSICA · UNIDAD 04
              </h3>
              <p style={{ color: 'var(--lum-muted)', fontSize: '.88rem', marginBottom: 16 }}>
                Movimiento armónico — Comprende el péndulo desde una simulación guiada.
              </p>

              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="lum-card p-3 text-center">
                    <div className="stat-num" style={{ color: 'var(--lum-accent)' }}>12</div>
                    <div className="stat-label mt-1">Racha de enfoque</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--lum-muted)' }}>días</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="lum-card p-3 text-center">
                    <div className="stat-num" style={{ color: 'var(--lum-primary2)' }}>68%</div>
                    <div className="stat-label mt-1">Dominio curricular</div>
                    <div className="lum-progress mt-2">
                      <div className="lum-progress-fill" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Nexa message */}
              <div className="d-flex align-items-start gap-3 p-3" style={{
                background: 'rgba(108,99,255,.1)', borderRadius: 10, border: '1px solid rgba(108,99,255,.25)'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg,#6c63ff,#a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.8rem', fontWeight: 700, color: '#fff'
                }}>N</div>
                <div>
                  <div style={{ fontSize: '.72rem', color: 'var(--lum-primary2)', fontWeight: 700, marginBottom: 2 }}>
                    NEXA · TUTORA IA
                  </div>
                  <p style={{ fontSize: '.85rem', color: 'var(--lum-text)', margin: 0 }}>
                    "Hoy conectaremos ondas, música y movimiento. ¿Lista, Sofía?"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features row */}
        <div id="como" className="row g-4 mt-5 fade-up fade-up-d2">
          {[
            { icon: 'bi-graph-up-arrow', title: 'Currículo adaptado', desc: 'Personalizado a tus objetivos y ritmo de aprendizaje.' },
            { icon: 'bi-cpu-fill', title: 'Tutora IA con memoria', desc: 'Nexa recuerda tu contexto y calibra cada explicación.' },
            { icon: 'bi-patch-check-fill', title: 'Evaluaciones que explican', desc: 'No castigan. Guían. Cada error es una nueva ruta.' },
          ].map((f, i) => (
            <div className="col-md-4" key={i}>
              <div className="lum-card p-4 h-100">
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'linear-gradient(135deg,rgba(108,99,255,.25),rgba(168,85,247,.25))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', color: 'var(--lum-primary2)', marginBottom: 14
                }}>
                  <i className={`bi ${f.icon}`} />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: '.95rem', color: '#fff', marginBottom: 6 }}>{f.title}</h4>
                <p style={{ color: 'var(--lum-muted)', fontSize: '.85rem', margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
