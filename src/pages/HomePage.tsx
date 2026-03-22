import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { MessageCircle, Smile, Dumbbell, BookOpen, TrendingUp, Activity } from 'lucide-react'
import './Pages.css'

export function HomePage() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  const actions = [
    { icon: MessageCircle, label: 'Chat', sub: 'Talk with AI', color: 'var(--primary)', bg: 'var(--primary-100)', to: '/chat' },
    { icon: Smile, label: 'Mood Log', sub: 'Record your mood', color: 'var(--secondary-dark)', bg: 'var(--secondary-light)', to: '/mood' },
    { icon: Dumbbell, label: 'Exercises', sub: 'Relax & breathe', color: 'var(--accent-dark)', bg: 'var(--accent-light)', to: '/exercises' },
    { icon: BookOpen, label: 'Resources', sub: 'Helpful info', color: 'var(--info)', bg: '#E3F2FD', to: '#' },
  ]

  return (
    <div className="page">
      <header className="page-header home-header">
        <div>
          <h1 className="greeting">{greeting}! 👋</h1>
          <p className="date">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        </div>
        <div className="user-avatar" onClick={() => navigate('/profile')}>
          {(user?.email?.[0] || 'U').toUpperCase()}
        </div>
      </header>

      <section className="section">
        <h2 className="section-title">Today's Activities</h2>
        <div className="action-grid">
          {actions.map((a) => (
            <button key={a.label} className="action-card" onClick={() => navigate(a.to)}>
              <div className="action-icon" style={{ background: a.bg }}>
                <a.icon size={22} color={a.color} />
              </div>
              <strong>{a.label}</strong>
              <span className="action-sub">{a.sub}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">This Week's Mood</h2>
        <div className="stats-row">
          <div className="stat-card">
            <TrendingUp size={28} color="var(--primary)" />
            <div className="stat-value">7.2</div>
            <div className="stat-label">Avg Mood</div>
          </div>
          <div className="stat-card">
            <Activity size={28} color="var(--success)" />
            <div className="stat-value">Stable</div>
            <div className="stat-label">Trend</div>
          </div>
          <div className="stat-card">
            <Smile size={28} color="var(--accent-dark)" />
            <div className="stat-value">5</div>
            <div className="stat-label">Entries</div>
          </div>
        </div>
      </section>

      <section className="quote-banner">
        <p>"One step at a time, at your own pace. You are not alone."</p>
      </section>
    </div>
  )
}
