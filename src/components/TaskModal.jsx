export default function TaskModal({ task, onClose, onDrop, onFileChange, fileRef, dragging, setDragging }) {
  if (!task) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)',
      backdropFilter: 'blur(6px)', zIndex: 9000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lum-card fade-up" style={{
        maxWidth: 560, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: 24,
        border: `1px solid ${task.color}40`,
        boxShadow: `0 24px 80px rgba(0,0,0,.6), 0 0 40px ${task.color}20`
      }}>
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div>
            <div style={{ fontSize: '.72rem', fontWeight: 700, color: task.color,
              letterSpacing: '.05em', marginBottom: 4 }}>
              {task.materia.toUpperCase()} · TAREA
            </div>
            <h4 style={{ fontWeight: 800, color: '#fff', margin: 0 }}>{task.titulo}</h4>
          </div>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--lum-muted)', cursor: 'pointer', fontSize: '1.3rem', padding: 0 }}>
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* Info */}
        <div className="d-flex gap-3 mb-4">
          <span className={`badge-pill ${task.done ? 'badge-success' : 'badge-warning'}`}>
            {task.done ? '✓ Entregada' : 'Pendiente'}
          </span>
          <span style={{ fontSize: '.8rem', color: 'var(--lum-muted)' }}>
            <i className="bi bi-clock me-1" />{task.due}
          </span>
        </div>

        {/* Descripción */}
        <div className="mb-4">
          <h6 style={{ fontWeight: 700, color: '#fff', marginBottom: 8, fontSize: '.85rem' }}>Instrucciones</h6>
          <p style={{ color: 'var(--lum-muted)', fontSize: '.87rem', lineHeight: 1.7, margin: 0 }}>
            {task.desc}
          </p>
        </div>

        {/* Nota de Nexa */}
        <div className="d-flex gap-3 p-3 mb-4" style={{
          background: 'rgba(108,99,255,.08)', borderRadius: 10, border: '1px solid rgba(108,99,255,.2)'
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#6c63ff,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '.75rem', fontWeight: 700, color: '#fff'
          }}>N</div>
          <div>
            <div style={{ fontSize: '.7rem', color: 'var(--lum-primary2)', fontWeight: 700, marginBottom: 3 }}>NEXA · SUGERENCIA</div>
            <p style={{ fontSize: '.83rem', color: 'var(--lum-text)', margin: 0 }}>{task.iaNote}</p>
          </div>
        </div>

        {/* Upload section */}
        {!task.done ? (
          <div>
            <h6 style={{ fontWeight: 700, color: '#fff', marginBottom: 12, fontSize: '.85rem' }}>
              Cargar entrega
            </h6>
            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileRef.current.click()}
              style={{
                border: `2px dashed ${dragging ? task.color : 'var(--lum-border)'}`,
                borderRadius: 12, padding: '28px 20px', textAlign: 'center', cursor: 'pointer',
                background: dragging ? `${task.color}10` : 'rgba(255,255,255,.02)',
                transition: 'all .2s'
              }}
            >
              <i className="bi bi-cloud-arrow-up-fill" style={{
                fontSize: '2rem', color: dragging ? task.color : 'var(--lum-muted)',
                display: 'block', marginBottom: 10
              }} />
              <div style={{ fontWeight: 600, color: '#fff', fontSize: '.88rem', marginBottom: 4 }}>
                Arrastra tu archivo aquí
              </div>
              <div style={{ fontSize: '.78rem', color: 'var(--lum-muted)' }}>
                o haz clic para seleccionar — PDF, DOCX, JPG, PNG (máx. 20 MB)
              </div>
              <input
                ref={fileRef} type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                onChange={onFileChange}
              />
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-3 p-3"
            style={{ background: 'rgba(34,197,94,.08)', borderRadius: 10, border: '1px solid rgba(34,197,94,.25)' }}>
            <i className="bi bi-file-earmark-check-fill" style={{ color: 'var(--lum-success)', fontSize: '1.4rem', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--lum-success)', fontSize: '.85rem' }}>Tarea entregada</div>
              <div style={{ fontSize: '.78rem', color: 'var(--lum-muted)', marginTop: 2 }}>
                {task.archivo}
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-end mt-4">
          <button onClick={onClose} className="btn-lum btn-lum-ghost" style={{ padding: '9px 20px' }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
