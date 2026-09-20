export default function ProgressCourse({ name, tema, pct, color }) {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div>
          <span style={{ fontWeight: 600, color: '#fff', fontSize: '.9rem' }}>{name}</span>
          <span style={{ color: 'var(--lum-muted)', fontSize: '.8rem', marginLeft: 10 }}>{tema}</span>
        </div>
        <span style={{ fontWeight: 700, color: color, fontSize: '.88rem' }}>{pct}%</span>
      </div>
      <div className="lum-progress">
        <div 
          className="lum-progress-fill" 
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }} 
        />
      </div>
    </div>
  )
}
