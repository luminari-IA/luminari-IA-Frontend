import { useState, useEffect } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import api from '../../api/axios'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('prompt');
  
  // States
  const [promptContent, setPromptContent] = useState('');
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]);

  useEffect(() => {
    fetchPrompt();
    fetchMaterias();
    fetchClases();
  }, []);

  const fetchPrompt = () => api.get('/admin/prompt').then(r => setPromptContent(r.data.data.content));
  const fetchMaterias = () => api.get('/admin/subjects').then(r => setMaterias(r.data.data));
  const fetchClases = () => api.get('/admin/live-classes').then(r => setClases(r.data.data));

  const handlePromptSave = async () => {
    await api.put('/admin/prompt', { content: promptContent });
    alert("Prompt actualizado");
  };

  const handleAddMateria = async () => {
    const name = prompt("Nombre de la materia:");
    if (!name) return;
    await api.post('/admin/subjects', { name, is_active: true });
    fetchMaterias();
  };

  const handleDeleteMateria = async (id) => {
    if (!confirm("¿Borrar materia?")) return;
    await api.delete(`/admin/subjects/${id}`);
    fetchMaterias();
  };

  const handleAddClase = async () => {
    if (materias.length === 0) return alert("Crea una materia primero");
    const title = prompt("Título de la clase:");
    if (!title) return;
    await api.post('/admin/live-classes', {
      title, subject_id: materias[0].id, scheduled_at: new Date().toISOString().slice(0,19).replace('T', ' '), status: 'pending'
    });
    fetchClases();
  };

  const handleDeleteClase = async (id) => {
    if (!confirm("¿Borrar clase?")) return;
    await api.delete(`/admin/live-classes/${id}`);
    fetchClases();
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
        <button className={`btn-lum ${activeTab === 'clases' ? 'btn-lum-primary' : 'btn-lum-ghost'}`} onClick={() => setActiveTab('clases')}>Clases en Vivo</button>
      </div>

      <div className="lum-card p-4">
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
              <button className="btn-lum btn-lum-primary" onClick={handleAddMateria}>+ Añadir Materia</button>
            </div>
            <ul className="list-group">
              {materias.map(m => (
                <li key={m.id} className="list-group-item d-flex justify-content-between" style={{background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--lum-border)'}}>
                  <span>{m.name}</span>
                  <button className="btn-lum btn-lum-ghost text-danger p-0" onClick={() => handleDeleteMateria(m.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'clases' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 style={{color: '#fff', fontWeight: 800}}>Clases en Vivo Programadas</h5>
              <button className="btn-lum btn-lum-primary" onClick={handleAddClase}>+ Añadir Clase</button>
            </div>
            <ul className="list-group">
              {clases.map(c => (
                <li key={c.id} className="list-group-item d-flex justify-content-between" style={{background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid var(--lum-border)'}}>
                  <div>
                    <strong>{c.title}</strong>
                    <div style={{fontSize: '0.75rem', color: 'var(--lum-muted)'}}>Materia: {c.subject?.name} | Fecha: {new Date(c.scheduled_at).toLocaleString()}</div>
                  </div>
                  <button className="btn-lum btn-lum-ghost text-danger p-0" onClick={() => handleDeleteClase(c.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
