import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { LogOut, Bell, Shield, Download, HelpCircle, Info, ChevronRight } from 'lucide-react'
import './Pages.css'

const menuItems = [
  { icon: Bell, label: 'Notifications' },
  { icon: Shield, label: 'Privacy' },
  { icon: Download, label: 'Export Data' },
  { icon: HelpCircle, label: 'Help & Support' },
  { icon: Info, label: 'About' },
]

export function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="page">
      <h1 className="page-title">Profile</h1>

      <div className="card profile-card">
        <div className="profile-avatar">
          {(user?.email?.[0] || 'U').toUpperCase()}
        </div>
        <h2 className="profile-name">{user?.email || 'Anonymous User'}</h2>
        <div className="profile-stats">
          <div><strong>42</strong><span>Days Logged</span></div>
          <div className="stat-divider" />
          <div><strong>7.2</strong><span>Avg Mood</span></div>
          <div className="stat-divider" />
          <div><strong>15</strong><span>Sessions</span></div>
        </div>
      </div>

      <div className="card menu-card">
        {menuItems.map((item) => (
          <button key={item.label} className="menu-item">
            <div className="menu-item-left">
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
            <ChevronRight size={18} className="menu-chevron" />
          </button>
        ))}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>

      <p className="version-text">TheraBuddy v1.0.0</p>
    </div>
  )
}
