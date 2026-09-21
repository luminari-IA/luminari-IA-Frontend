import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(name, email, password);
    if (result.success) {
      navigate('/onboarding/intereses');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  const leftPanel = (
    <>
      <div className="badge-pill badge-primary mb-4">TU RUTA, TU RITMO</div>
      <h2 style={{ fontWeight: 800, fontSize: '1.9rem', color: '#fff', lineHeight: 1.3, marginBottom: 24 }}>
        Un sistema que aprende cómo aprendes.
      </h2>
      {[
        'Currículo adaptado a tus objetivos',
        'Tutora IA con memoria contextual',
        'Evaluaciones que explican, no castigan',
      ].map((item, i) => (
        <div key={i} className="d-flex align-items-center gap-3 mb-3">
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--lum-success)', fontSize: '.8rem'
          }}>
            <i className="bi bi-check-lg" />
          </div>
          <span style={{ color: 'var(--lum-text)', fontSize: '.9rem' }}>{item}</span>
        </div>
      ))}
      <p style={{ fontSize: '.75rem', color: 'var(--lum-muted)', marginTop: 24 }}>
        <i className="bi bi-lock-fill me-1" />
        Cifrado de extremo a extremo · Control parental opcional
      </p>
    </>
  )

  return (
    <AuthLayout leftPanelContent={leftPanel}>
      <div className="badge-pill badge-accent mb-3">PASO 01 · PERFIL</div>
      <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#fff', marginBottom: 4 }}>
        Crea tu espacio de aprendizaje
      </h3>
      <p style={{ color: 'var(--lum-muted)', marginBottom: 24, fontSize: '.88rem' }}>
        Usaremos estos datos para personalizar tu experiencia.
      </p>

      <button className="btn-lum btn-lum-ghost w-100 justify-content-center mb-4" style={{ padding: '12px' }}>
        <i className="bi bi-google me-2" /> Registrarme con Google
      </button>

      {error && (
        <div className="alert alert-danger" style={{ fontSize: '0.85rem', padding: '10px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-3 mb-4">
          <div>
            <label className="d-block mb-1" style={{ fontSize: '.8rem', color: 'var(--lum-muted)', fontWeight: 600 }}>
              Nombre completo
            </label>
            <input 
              type="text" 
              className="lum-input" 
              placeholder="Sofía Martínez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="d-block mb-1" style={{ fontSize: '.8rem', color: 'var(--lum-muted)', fontWeight: 600 }}>
              Correo electrónico
            </label>
            <input 
              type="email" 
              className="lum-input" 
              placeholder="sofia@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="d-block mb-1" style={{ fontSize: '.8rem', color: 'var(--lum-muted)', fontWeight: 600 }}>
              Contraseña
            </label>
            <input 
              type="password" 
              className="lum-input" 
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 mb-4">
          <input type="checkbox" id="terms" style={{ accentColor: 'var(--lum-primary)' }} required />
          <label htmlFor="terms" style={{ fontSize: '.82rem', color: 'var(--lum-muted)' }}>
            Acepto los <span style={{ color: 'var(--lum-primary2)' }}>Términos</span> y la{' '}
            <span style={{ color: 'var(--lum-primary2)' }}>Política de privacidad</span> de Luminary IA.
          </label>
        </div>

        <button 
          type="submit" 
          className="btn-lum btn-lum-primary w-100 justify-content-center" 
          style={{ padding: '13px' }}
          disabled={loading}
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta y continuar'} <i className="bi bi-arrow-right ms-1" />
        </button>
      </form>

      <p className="text-center mt-4" style={{ fontSize: '.85rem', color: 'var(--lum-muted)' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" style={{ color: 'var(--lum-primary2)', textDecoration: 'none', fontWeight: 600 }}>
          Iniciar sesión
        </Link>
      </p>
    </AuthLayout>
  )
}
