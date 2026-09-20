import { useState, useEffect } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function ClasesEnVivo() {
  const { user } = useAuth()
  
  const [materias, setMaterias] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  
  const [duda, setDuda] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingInit, setLoadingInit] = useState(true)

  useEffect(() => {
    // 1. Obtener las materias disponibles
    api.get('/subjects')
      .then(res => {
        setMaterias(res.data.data)
        setLoadingInit(false)
      })
      .catch(err => {
        console.error("Error al cargar materias:", err)
        setLoadingInit(false)
      })
  }, []);

  const iniciarClase = async (materia) => {
    setSelectedSubject(materia);
    setLoading(true);
    try {
      const res = await api.post('/tutor/session', {
        subject_id: materia.id,
        title: `Clase en Vivo de ${materia.name}`
      });
      setSessionId(res.data.data.id);
      setChatHistory([
        { role: 'system', content: `Conectado exitosamente al núcleo de Nexa para ${materia.name}. ¿Sobre qué tema te gustaría aprender hoy?` }
      ]);
    } catch (err) {
      console.error("Error al iniciar sesión con Nexa:", err);
      setChatHistory([{ role: 'system', content: 'Error al conectar con Nexa.' }]);
    } finally {
      setLoading(false);
    }
  };

  const enviarDuda = async () => {
    if (!duda.trim() || !sessionId || loading) return;

    const mensajeUsuario = duda;
    setDuda('');
    setChatHistory(prev => [...prev, { role: 'user', content: mensajeUsuario }]);
    setLoading(true);

    try {
      const res = await api.post(`/tutor/session/${sessionId}/message`, {
        message: mensajeUsuario
      });
      setChatHistory(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'system', content: 'Error de conexión con Nexa.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (loadingInit) {
    return (
      <DashboardLayout breadcrumb="LUMIRAI / CLASES EN VIVO" title="Preparando entorno..." subtitle="">
        <div className="text-center p-5"><div className="spinner-border text-primary" /></div>
      </DashboardLayout>
    );
  }

  // Vista 1: Seleccionar materia
  if (!selectedSubject) {
    return (
      <DashboardLayout 
        breadcrumb="LUMIRAI / CLASES EN VIVO" 
        title="Clases Inteligentes Bajo Demanda" 
        subtitle="Selecciona la materia que deseas estudiar y Nexa generará una sesión interactiva al instante."
      >
        <div className="row g-4 mt-2">
          {materias.length === 0 ? (
            <div className="col-12 text-center p-5 lum-card">No hay materias disponibles en este momento.</div>
          ) : (
            materias.map((m, i) => (
              <div className="col-md-4 col-sm-6" key={m.id}>
                <div 
                  className="lum-card p-4 text-center cursor-pointer hover-scale fade-up" 
                  style={{ animationDelay: `${i * 0.1}s`, cursor: 'pointer', transition: 'all .2s' }}
                  onClick={() => iniciarClase(m)}
                >
                  <div style={{ 
                    width: 60, height: 60, borderRadius: '50%', background: 'rgba(108,99,255,.15)', 
                    color: 'var(--lum-primary2)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px auto', fontSize: '1.5rem'
                  }}>
                    <i className="bi bi-cpu-fill" />
                  </div>
                  <h5 style={{ fontWeight: 700, color: '#fff', marginBottom: 8 }}>{m.name}</h5>
                  <p style={{ color: 'var(--lum-muted)', fontSize: '.85rem', marginBottom: 0 }}>
                    Inicia una sesión interactiva sobre {m.name.toLowerCase()} con IA.
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </DashboardLayout>
    );
  }

  // Vista 2: Sesión de clase activa
  return (
    <DashboardLayout
      breadcrumb={`LUMIRAI / EN VIVO / ${selectedSubject.name.toUpperCase()}`}
      title={`Nexa · ${selectedSubject.name}`}
      subtitle="Sesión interactiva generada por IA"
      rightElement={
        <div className="badge-pill badge-primary">
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block', marginRight: 6 }} />
          IA EN VIVO
        </div>
      }
    >
      <div className="row g-4">
        {/* Visualización de IA */}
        <div className="col-lg-7">
          <div className="lum-card mb-4" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(108,99,255,.3)' }}>
            <div style={{
              width: '100%', aspectRatio: '16/9', background: 'radial-gradient(circle at center, rgba(108,99,255,0.15) 0%, var(--lum-card) 70%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              {/* Animación de IA "Pensando / Hablando" */}
              <div className={`ai-orb ${loading ? 'ai-orb-pulse' : ''}`} style={{
                width: 120, height: 120, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--lum-primary), var(--lum-primary2))',
                boxShadow: loading ? '0 0 50px rgba(168,85,247,.6)' : '0 0 20px rgba(108,99,255,.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}>
                <i className="bi bi-soundwave" style={{ fontSize: '3rem', color: '#fff', opacity: loading ? 1 : 0.5 }} />
              </div>
              <div style={{ marginTop: 24, fontWeight: 600, color: 'var(--lum-muted)' }}>
                {loading ? 'Nexa está analizando...' : 'Nexa está a la escucha'}
              </div>
              
              {/* Controles superpuestos */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'end'
              }}>
                <button className="btn-lum btn-lum-ghost" style={{ background: 'rgba(239,68,68,.15)', color: '#ef4444' }} onClick={() => setSelectedSubject(null)}>
                  <i className="bi bi-box-arrow-right me-2" /> Finalizar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat / Dudas con Nexa */}
        <div className="col-lg-5">
          <div className="lum-card p-0 d-flex flex-column" style={{ height: 'calc(100% - 24px)' }}>
            <div className="p-3 d-flex align-items-center gap-3" style={{ borderBottom: '1px solid var(--lum-border)' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg,#6c63ff,#a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: '#fff', fontSize: '.9rem'
              }}>N</div>
              <div>
                <h6 style={{ fontWeight: 700, color: '#fff', margin: 0 }}>Interacción directa</h6>
                <p style={{ color: 'var(--lum-muted)', fontSize: '.75rem', margin: 0 }}>Comunícate con la IA de la clase</p>
              </div>
            </div>

            {/* Chat History */}
            <div className="p-3 flex-grow-1" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {chatHistory.map((msg, i) => (
                <div key={i} className={`d-flex flex-column ${msg.role === 'user' ? 'align-items-end' : 'align-items-start'}`}>
                  {msg.role === 'system' ? (
                    <div className="w-100 text-center my-2" style={{ fontSize: '.75rem', color: 'var(--lum-muted)', fontStyle: 'italic' }}>
                      {msg.content}
                    </div>
                  ) : (
                    <div style={{
                      padding: '10px 14px', borderRadius: 14, maxWidth: '85%',
                      background: msg.role === 'user' ? 'var(--lum-primary)' : 'rgba(255,255,255,.05)',
                      color: '#fff', fontSize: '.85rem', border: msg.role === 'assistant' ? '1px solid var(--lum-border)' : 'none',
                      borderBottomRightRadius: msg.role === 'user' ? 4 : 14,
                      borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 14
                    }}>
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="d-flex align-items-start">
                  <div style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(255,255,255,.05)', border: '1px solid var(--lum-border)', color: 'var(--lum-muted)', fontSize: '.85rem', borderBottomLeftRadius: 4 }}>
                    <i className="bi bi-three-dots pulse-dot"></i> Generando respuesta...
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <div className="p-3" style={{ borderTop: '1px solid var(--lum-border)' }}>
              <div className="d-flex gap-2">
                <input 
                  type="text" className="lum-input flex-grow-1"
                  placeholder="Escribe tu duda o pregunta aquí..."
                  value={duda} 
                  onChange={e => setDuda(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && enviarDuda()}
                  disabled={loading || !sessionId}
                  style={{ borderRadius: 20 }}
                />
                <button 
                  className="btn-lum btn-lum-primary" 
                  style={{ padding: '10px 18px', borderRadius: 20 }}
                  onClick={enviarDuda}
                  disabled={loading || !sessionId}
                >
                  <i className="bi bi-send-fill" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
