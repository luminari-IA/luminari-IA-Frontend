import { Link } from 'react-router-dom'

export default function TaskItem({ task, onOpen }) {
  return (
    <div
      style={{
        borderRadius: 12, 
        border: `1px solid ${task.done ? 'rgba(34,197,94,.2)' : 'var(--lum-border)'}`,
        background: task.done ? 'rgba(34,197,94,.04)' : 'rgba(255,255,255,.02)',
        overflow: 'hidden'
      }}>
      <div className="d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center gap-3">
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: task.color, flexShrink: 0,
            boxShadow: `0 0 8px ${task.color}80`
          }} />
          <div>
            <div style={{ fontWeight: 600, color: task.done ? 'var(--lum-muted)' : '#fff',
              fontSize: '.9rem', textDecoration: task.done ? 'line-through' : 'none' }}>
              {task.titulo}
            </div>
            <div style={{ fontSize: '.75rem', color: 'var(--lum-muted)', marginTop: 2 }}>
              {task.materia}
              <span style={{ margin: '0 6px' }}>·</span>
              <i className="bi bi-clock me-1" />
              {task.due}
              {task.archivo && (
                <span style={{ marginLeft: 8, color: 'var(--lum-success)' }}>
                  <i className="bi bi-paperclip me-1" />{task.archivo}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2">
          {task.done
            ? <span className="badge-pill badge-success"><i className="bi bi-check-lg" /> Entregada</span>
            : <span className="badge-pill badge-warning">Pendiente</span>
          }
          <button
            onClick={() => onOpen(task)}
            className="btn-lum btn-lum-ghost"
            style={{ padding: '6px 14px', fontSize: '.8rem' }}
          >
            <i className="bi bi-eye me-1" /> Ver
          </button>
        </div>
      </div>
    </div>
  )
}
