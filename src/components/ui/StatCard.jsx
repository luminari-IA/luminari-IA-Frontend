export default function StatCard({ value, label, subtitle, colorClass, progress }) {
  return (
    <div className="lum-card p-4 text-center">
      <div className={`stat-num text-${colorClass}`} style={{ color: `var(--lum-${colorClass})` }}>
        {value}
      </div>
      <div className="stat-label mt-1">{label}</div>
      
      {progress !== undefined ? (
        <div className="lum-progress mt-2">
          <div className="lum-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      ) : (
        <div style={{ fontSize: '.75rem', color: 'var(--lum-muted)', marginTop: 4 }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}
