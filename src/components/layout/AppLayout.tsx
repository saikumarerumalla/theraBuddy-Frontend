import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Home, MessageCircle, Smile, Dumbbell, User } from 'lucide-react'
import './AppLayout.css'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/mood', icon: Smile, label: 'Mood' },
  { to: '/exercises', icon: Dumbbell, label: 'Exercises' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <span className="logo-icon">🧠</span>
          </div>
          <h1 className="sidebar-title">TheraBuddy</h1>
          <p className="sidebar-subtitle">Your wellness companion</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item--active' : ''}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-quote">
            "One step at a time. You are not alone."
          </div>
        </div>
      </aside>

      <main className="main-content">
        <div className="page-container fade-in" key={location.pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
