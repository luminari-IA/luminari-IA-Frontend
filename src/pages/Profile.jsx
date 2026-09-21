import { useState, useRef } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const fileInputRef = useRef(null)

  // Local state for the form
  const [formData, setFormData] = useState({
    name: user?.name || '',
    theme_color: user?.theme_color || '#6c63ff',
    font_family: user?.font_family || 'Inter, sans-serif',
    border_style: user?.border_style || 'rounded',
    reduced_animations: user?.reduced_animations || false,
    tts_speed: user?.tts_speed || 'normal'
  })
  const [photoPreview, setPhotoPreview] = useState(user?.profile_photo_path || null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMsg('')
    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('theme_color', formData.theme_color)
      data.append('font_family', formData.font_family)
      data.append('border_style', formData.border_style)
      data.append('reduced_animations', formData.reduced_animations ? '1' : '0')
      data.append('tts_speed', formData.tts_speed)
      if (selectedFile) {
        data.append('photo', selectedFile)
      }

      const res = await api.post('/profile/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      updateUser(res.data.user)
      setSuccessMsg('Perfil actualizado correctamente.')
    } catch (err) {
      console.error(err)
      alert('Error al actualizar el perfil.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout
      breadcrumb="LUMINARY / MI PERFIL"
      title="Configuración de Perfil"
      subtitle="Personaliza tu experiencia y apariencia en Luminary"
    >
      <div className="row g-4">
        <div className="col-12">
          {successMsg && (
            <div className="alert alert-success" style={{ background: 'rgba(34,197,94,.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,.2)', borderRadius: 12 }}>
              <i className="bi bi-check-circle me-2" /> {successMsg}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="lum-card p-4">
            <h5 className="mb-4" style={{ color: '#fff', fontWeight: 700 }}>Información General</h5>
            
            <div className="d-flex align-items-center gap-4 mb-4">
              <div 
                style={{ 
                  width: 80, height: 80, borderRadius: '50%', background: 'var(--lum-card)',
                  border: '2px solid var(--lum-border)', overflow: 'hidden', cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => fileInputRef.current.click()}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--lum-primary)', background: 'rgba(108,99,255,.1)' }}>
                    {formData.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.6rem', textAlign: 'center', padding: '2px 0' }}>
                  CAMBIAR
                </div>
              </div>
              <div>
                <h6 style={{ color: '#fff', margin: 0 }}>Foto de Perfil</h6>
                <p style={{ color: 'var(--lum-muted)', fontSize: '0.8rem', margin: 0 }}>Haz clic en la imagen para subir una nueva.</p>
                <input type="file" ref={fileInputRef} onChange={handlePhotoChange} style={{ display: 'none' }} accept="image/*" />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label" style={{ color: 'var(--lum-muted)' }}>Nombre Completo</label>
              <input type="text" name="name" className="lum-input" value={formData.name} onChange={handleChange} required />
            </div>

            <hr style={{ borderColor: 'var(--lum-border)', margin: '2rem 0' }} />

            <h5 className="mb-4" style={{ color: '#fff', fontWeight: 700 }}>Apariencia de Luminary</h5>
            
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="form-label" style={{ color: 'var(--lum-muted)' }}>Color del Tema Primario</label>
                <div className="d-flex gap-2 align-items-center">
                  <input 
                    type="color" 
                    name="theme_color" 
                    value={formData.theme_color} 
                    onChange={handleChange}
                    style={{ width: 40, height: 40, padding: 0, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'transparent' }}
                  />
                  <span style={{ color: '#fff' }}>{formData.theme_color.toUpperCase()}</span>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{ color: 'var(--lum-muted)' }}>Tipografía del Sistema</label>
                <select name="font_family" className="lum-input" value={formData.font_family} onChange={handleChange}>
                  <option value="Inter, sans-serif">Inter (Moderna y Limpia)</option>
                  <option value="Roboto, sans-serif">Roboto (Clásica y Legible)</option>
                  <option value="Poppins, sans-serif">Poppins (Redondeada y Amigable)</option>
                  <option value="Outfit, sans-serif">Outfit (Geométrica)</option>
                  <option value="'Courier New', monospace">Monoespaciada (Estilo Código)</option>
                </select>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="form-check form-switch d-flex align-items-center gap-2">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    role="switch" 
                    name="reduced_animations"
                    checked={formData.reduced_animations}
                    onChange={handleChange}
                    style={{ cursor: 'pointer' }}
                  />
                  <label className="form-check-label" style={{ color: '#fff', marginTop: 2 }}>
                    Reducir Animaciones (Mejora el rendimiento)
                  </label>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: 'var(--lum-border)', margin: '2rem 0' }} />

            <h5 className="mb-4" style={{ color: '#fff', fontWeight: 700 }}>Preferencias de IA (Nexa)</h5>

            <div className="mb-4">
              <label className="form-label" style={{ color: 'var(--lum-muted)' }}>Velocidad de Voz de Nexa</label>
              <select name="tts_speed" className="lum-input" value={formData.tts_speed} onChange={handleChange}>
                <option value="slow">Lenta y Pausada</option>
                <option value="normal">Normal (Recomendada)</option>
                <option value="fast">Rápida y Dinámica</option>
              </select>
            </div>

            <div className="text-end mt-5">
              <button type="submit" className="btn-lum btn-lum-primary" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
