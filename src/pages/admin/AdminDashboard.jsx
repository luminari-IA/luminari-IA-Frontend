import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../api/axios'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('prompt');
  
  // States
  const [promptContent, setPromptContent] = useState('');
  const [materias, setMaterias] = useState([]);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPrompt();
    fetchMaterias();
  }, []);

  const fetchPrompt = () => api.get('/admin/prompt').then(r => setPromptContent(r.data.data.content));
  const fetchMaterias = () => api.get('/admin/subjects').then(r => setMaterias(r.data.data));

  const handlePromptSave = async () => {
    await api.put('/admin/prompt', { content: promptContent });
    alert("Prompt actualizado");
  };

  const handleAddMateria = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    
    setIsSubmitting(true);
    try {
      await api.post('/admin/subjects', { name: newSubjectName, is_active: true });
      await fetchMaterias();
      setIsModalOpen(false);
      setNewSubjectName('');
    } catch (error) {
      console.error("Error creating subject:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMateria = async (id) => {
    if (!confirm("¿Borrar materia?")) return;
    await api.delete(`/admin/subjects/${id}`);
    fetchMaterias();
  };

  return (
    <DashboardLayout
      breadcrumb="LUMIRAI / ADMIN"
      title="Panel de Control del Administrador"
      subtitle="Gestiona el contenido de Luminary y el cerebro de Nexa."
    >
      <div className="d-flex gap-3 mb-4">
        <button className={`btn-lum ${activeTab === 'prompt' ? 'btn-lum-primary' : 'btn-lum-ghost'}`} onClick={() => setActiveTab('prompt')}>Prompt Nexa</button>
        <button className={`btn-lum ${activeTab === 'materias' ? 'btn-lum-primary' : 'btn-lum-ghost'}`} onClick={() => setActiveTab('materias')}>Materias</button>
      </div>

      <div className="lum-card p-4 fade-up fade-up-d1">
        {activeTab === 'prompt' && (
          <div>
            <h5 style={{color: '#fff', fontWeight: 800}}>Configuración del Cerebro de Nexa</h5>
            <p style={{color: 'var(--lum-muted)', fontSize: '0.85rem'}}>
              Puedes usar las variables: <code>{'{user_name}'}</code>, <code>{'{subject_name}'}</code>, <code>{'{class_title}'}</code>
            </p>
            <textarea 
              className="lum-input mb-3" 
              rows="6" 
              value={promptContent} 
              onChange={e => setPromptContent(e.target.value)}
            />
            <button className="btn-lum btn-lum-primary" onClick={handlePromptSave}>Guardar Prompt</button>
          </div>
        )}

        {activeTab === 'materias' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 style={{color: '#fff', fontWeight: 800}}>Materias Ofrecidas</h5>
              <button className="btn-lum btn-lum-primary" onClick={() => setIsModalOpen(true)}>+ Añadir Materia</button>
            </div>
            
            {materias.length === 0 ? (
              <div className="text-center p-5" style={{ background: 'rgba(255,255,255,.02)', borderRadius: 12, border: '1px solid var(--lum-border)' }}>
                <p style={{ color: 'var(--lum-muted)', margin: 0 }}>No hay materias creadas todavía.</p>
              </div>
            ) : (
              <ul className="list-group">
                {materias.map((m, i) => (
                  <li key={m.id} className="list-group-item d-flex justify-content-between align-items-center fade-up" style={{ animationDelay: `${i * 0.05}s`, background: 'rgba(255,255,255,0.02)', color: '#fff', border: '1px solid var(--lum-border)', marginBottom: 8, borderRadius: 8 }}>
                    <div className="d-flex align-items-center gap-3">
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(108,99,255,.15)', color: 'var(--lum-primary2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className="bi bi-book-half" />
                      </div>
                      <span style={{ fontWeight: 600 }}>{m.name}</span>
                    </div>
                    <button className="btn-lum btn-lum-ghost text-danger p-2" onClick={() => handleDeleteMateria(m.id)}>
                      <i className="bi bi-trash" /> Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Modal Añadir Materia */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
        }}>
          <div className="lum-card" style={{ width: '100%', maxWidth: 450, padding: 0, overflow: 'hidden', animation: 'fadeUp .3s ease-out' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--lum-border)' }}>
              <h5 style={{ margin: 0, fontWeight: 800, color: '#fff' }}>Crear nueva materia</h5>
            </div>
            <div style={{ padding: 24 }}>
              <form onSubmit={handleAddMateria}>
                <div className="mb-4">
                  <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 600, color: 'var(--lum-muted)', marginBottom: 8 }}>Nombre de la materia</label>
                  <input 
                    type="text" 
                    className="lum-input" 
                    placeholder="Ej. Física Avanzada" 
                    value={newSubjectName}
                    onChange={e => setNewSubjectName(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn-lum btn-lum-ghost" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="btn-lum btn-lum-primary" disabled={isSubmitting || !newSubjectName.trim()}>
                    {isSubmitting ? 'Creando...' : 'Añadir materia'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
