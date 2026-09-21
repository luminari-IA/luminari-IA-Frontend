import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function ClasesEnVivo() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [materias, setMaterias] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  
  const [duda, setDuda] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingInit, setLoadingInit] = useState(true)

  // Media Controls
  const [isCamOn, setIsCamOn] = useState(false);
  const [isScreenShared, setIsScreenShared] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(true); // Nexa Voice TTS
  const [isMicOn, setIsMicOn] = useState(false); // User Voice Commands
  const [recognition, setRecognition] = useState(null);
  
  const videoRef = useRef(null);
  const chatEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Setup Web Speech API for voice commands
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'es-ES';
      rec.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setDuda(transcript);
      };
      rec.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsMicOn(false);
      };
      setRecognition(rec);
    }
  }, []);

  // Fetch subjects
  useEffect(() => {
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

  // Auto-scroll chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, loading]);

  // Clean up media streams on unmount or session end
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (recognition) recognition.stop();
    };
  }, [recognition]);

  const toggleMic = () => {
    if (!recognition) return alert('Tu navegador no soporta comandos de voz.');
    if (isMicOn) {
      recognition.stop();
    } else {
      setDuda('');
      recognition.start();
    }
    setIsMicOn(!isMicOn);
  };

  const toggleCam = async () => {
    if (isCamOn) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      setIsCamOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setIsCamOn(true);
        if (isScreenShared) setIsScreenShared(false);
        enviarEventoHardware("(He encendido mi cámara. Dime brevemente que me puedes ver.)");
      } catch (err) {
        console.error(err);
        alert('Error al acceder a la cámara.');
      }
    }
  };

  const toggleScreen = async () => {
    if (isScreenShared) {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
      setIsScreenShared(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
        setIsScreenShared(true);
        if (isCamOn) setIsCamOn(false);
        enviarEventoHardware("(He empezado a compartir mi pantalla. Dime brevemente que la estás viendo.)");
        
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenShared(false);
          if (videoRef.current) videoRef.current.srcObject = null;
        };
      } catch (err) {
        console.error(err);
      }
    }
  };

  const enviarEventoHardware = async (evento) => {
    if (!sessionId || loading) return;
    setLoading(true);
    try {
      const res = await api.post(`/tutor/session/${sessionId}/message`, { message: evento });
      const replyClean = res.data.reply.replace(/[*#|]/g, '');
      setChatHistory(prev => [...prev, { role: 'assistant', content: replyClean }]);
      speakText(replyClean);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text) => {
    if (!isVoiceOn || !window.speechSynthesis) {
      if (recognition) {
        setIsMicOn(true);
        try { recognition.start(); } catch(e) {}
      }
      return;
    }
    
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#|]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Google') || v.name.includes('Natural')));
    if (esVoice) utterance.voice = esVoice;
    
    utterance.onend = () => {
      if (recognition) {
        setIsMicOn(true);
        try { recognition.start(); } catch(e) {}
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const iniciarClase = async (materia) => {
    setSelectedSubject(materia);
    setLoading(true);
    try {
      const res = await api.post('/tutor/session', {
        subject_id: materia.id,
        title: `Clase en Vivo de ${materia.name}`
      });
      setSessionId(res.data.data.id);
      const initialMsg = `Conectado exitosamente al núcleo de Nexa para ${materia.name}. ¿Sobre qué tema te gustaría aprender hoy?`;
      setChatHistory([
        { role: 'system', content: initialMsg }
      ]);
      speakText(initialMsg);
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

    if (isMicOn && recognition) {
      recognition.stop();
      setIsMicOn(false);
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    try {
      const res = await api.post(`/tutor/session/${sessionId}/message`, {
        message: mensajeUsuario
      });
      const replyClean = res.data.reply.replace(/\*/g, ''); // Fix the asterisks issue here so it's saved clean
      setChatHistory(prev => [...prev, { role: 'assistant', content: replyClean }]);
      speakText(replyClean);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'system', content: 'Error de conexión con Nexa.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-send voice command
  useEffect(() => {
    if (!isMicOn || !duda.trim() || loading || !sessionId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      enviarDuda();
    }, 6000); // 6 segundos de silencio para auto-enviar

    return () => clearTimeout(typingTimeoutRef.current);
  }, [duda, isMicOn, loading, sessionId]);

  const finalizarClase = async () => {
    if (!sessionId || loading) return;
    
    if (recognition) recognition.stop();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }

    setLoading(true);
    setChatHistory(prev => [...prev, { role: 'system', content: 'Cerrando sesión y asignando tarea final...' }]);

    try {
      const res = await api.post(`/tutor/session/${sessionId}/finish`);
      const taskTitle = res.data.task.title;
      const finalMsg = "Excelente trabajo hoy. Te he asignado una nueva tarea: " + taskTitle + ". Serás redirigido al salón.";
      
      const utterance = new SpeechSynthesisUtterance(finalMsg);
      utterance.lang = 'es-ES';
      const voices = window.speechSynthesis.getVoices();
      const esVoice = voices.find(v => v.lang.includes('es') && (v.name.includes('Google') || v.name.includes('Natural')));
      if (esVoice) utterance.voice = esVoice;
      
      utterance.onend = () => {
        navigate('/salon');
      };
      
      window.speechSynthesis.speak(utterance);
      
    } catch (err) {
      console.error(err);
      alert('Error al finalizar la sesión.');
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
      <div className="row g-4" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
        {/* Visualización de IA */}
        <div className="col-lg-7" style={{ height: '100%' }}>
          <div className="lum-card mb-4" style={{ padding: 0, overflow: 'hidden', border: '1px solid rgba(108,99,255,.3)', height: '100%' }}>
            <div style={{
              width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(108,99,255,0.15) 0%, var(--lum-card) 70%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted 
                style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
                  opacity: (isCamOn || isScreenShared) ? 0.3 : 0,
                  transition: 'opacity 0.3s'
                }} 
              />
              
              {/* Animación de IA "Pensando / Hablando" */}
              <div className={`ai-orb ${loading ? 'ai-orb-pulse' : ''}`} style={{
                width: 120, height: 120, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--lum-primary), var(--lum-primary2))',
                boxShadow: loading ? '0 0 50px rgba(168,85,247,.6)' : '0 0 20px rgba(108,99,255,.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}>
                <i className="bi bi-soundwave" style={{ fontSize: '3rem', color: '#fff', opacity: loading ? 1 : 0.5 }} />
              </div>
              <div style={{ marginTop: 24, fontWeight: 600, color: 'var(--lum-muted)', zIndex: 10 }}>
                {loading ? 'Nexa está analizando...' : (isMicOn ? 'Escuchando comandos de voz...' : 'Nexa está a la espera')}
              </div>
              
              {/* Controles superpuestos */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,.8), transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                zIndex: 10
              }}>
                <div className="d-flex gap-2">
                  <button className={`btn-lum ${isMicOn ? 'btn-lum-primary' : 'btn-lum-ghost'}`} onClick={toggleMic} style={{ padding: '8px 12px', borderRadius: 12, background: isMicOn ? '' : 'rgba(255,255,255,.05)' }} title="Comandos de Voz">
                    <i className={`bi ${isMicOn ? 'bi-mic-fill' : 'bi-mic-mute-fill'}`} style={{ color: isMicOn ? '#fff' : '#aaa' }} />
                  </button>
                  <button className={`btn-lum ${isVoiceOn ? 'btn-lum-primary' : 'btn-lum-ghost'}`} onClick={() => setIsVoiceOn(!isVoiceOn)} style={{ padding: '8px 12px', borderRadius: 12, background: isVoiceOn ? '' : 'rgba(255,255,255,.05)' }} title="Voz de Nexa">
                    <i className={`bi ${isVoiceOn ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'}`} style={{ color: isVoiceOn ? '#fff' : '#aaa' }} />
                  </button>
                  <button className={`btn-lum ${isCamOn ? 'btn-lum-primary' : 'btn-lum-ghost'}`} onClick={toggleCam} style={{ padding: '8px 12px', borderRadius: 12, background: isCamOn ? '' : 'rgba(255,255,255,.05)' }} title="Cámara">
                    <i className={`bi ${isCamOn ? 'bi-camera-video-fill' : 'bi-camera-video-off-fill'}`} style={{ color: isCamOn ? '#fff' : '#aaa' }} />
                  </button>
                  <button className={`btn-lum ${isScreenShared ? 'btn-lum-primary' : 'btn-lum-ghost'}`} onClick={toggleScreen} style={{ padding: '8px 12px', borderRadius: 12, background: isScreenShared ? '' : 'rgba(255,255,255,.05)' }} title="Compartir Pantalla">
                    <i className="bi bi-display" style={{ color: isScreenShared ? '#fff' : '#aaa' }} />
                  </button>
                </div>
                
                <button className="btn-lum btn-lum-ghost" style={{ background: 'rgba(239,68,68,.15)', color: '#ef4444' }} onClick={finalizarClase}>
                  <i className="bi bi-box-arrow-right me-2" /> Finalizar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat / Dudas con Nexa */}
        <div className="col-lg-5" style={{ height: '100%' }}>
          <div className="lum-card p-0 d-flex flex-column" style={{ height: '100%', overflow: 'hidden' }}>
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
                      borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 14,
                      lineHeight: '1.4'
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
              <div ref={chatEndRef} />
            </div>

            {/* Input form */}
            <div className="p-3" style={{ borderTop: '1px solid var(--lum-border)' }}>
              <div className="d-flex gap-2">
                <input 
                  type="text" className="lum-input flex-grow-1"
                  placeholder={isMicOn ? "Escuchando voz..." : "Escribe tu duda o pregunta aquí..."}
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
