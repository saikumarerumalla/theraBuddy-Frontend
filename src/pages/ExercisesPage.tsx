import { useState } from 'react'
import { Wind, Flower2, Brain, Eye, Clock, BarChart3, Play } from 'lucide-react'
import './Pages.css'

const categories = [
  { id: 'breathing', label: 'Breathing', icon: Wind },
  { id: 'meditation', label: 'Meditation', icon: Flower2 },
  { id: 'cbt', label: 'CBT', icon: Brain },
  { id: 'mindfulness', label: 'Mindfulness', icon: Eye },
]

const exercises = [
  { id: '1', name: 'Box Breathing', category: 'breathing', duration: 5, difficulty: 'Beginner', desc: '4-4-4-4 breathing pattern for relaxation' },
  { id: '2', name: 'Body Scan Meditation', category: 'meditation', duration: 15, difficulty: 'Beginner', desc: 'Progressive body awareness meditation' },
  { id: '3', name: 'Thought Record', category: 'cbt', duration: 10, difficulty: 'Intermediate', desc: 'Identify and challenge negative thoughts' },
  { id: '4', name: 'Mindful Walking', category: 'mindfulness', duration: 20, difficulty: 'Beginner', desc: 'Walking meditation practice' },
  { id: '5', name: 'Deep Breathing', category: 'breathing', duration: 3, difficulty: 'Beginner', desc: 'Simple deep breathing exercise' },
  { id: '6', name: 'Loving Kindness', category: 'meditation', duration: 10, difficulty: 'Intermediate', desc: 'Compassion-focused meditation' },
]

export function ExercisesPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = selected ? exercises.filter((e) => e.category === selected) : exercises

  return (
    <div className="page">
      <h1 className="page-title">Exercises</h1>

      <div className="category-bar">
        <button className={`category-chip ${!selected ? 'active' : ''}`} onClick={() => setSelected(null)}>All</button>
        {categories.map((c) => (
          <button key={c.id} className={`category-chip ${selected === c.id ? 'active' : ''}`} onClick={() => setSelected(c.id)}>
            <c.icon size={16} /> {c.label}
          </button>
        ))}
      </div>

      <div className="exercise-grid">
        {filtered.map((ex) => (
          <div key={ex.id} className="exercise-card fade-in">
            <div className="exercise-body">
              <h3>{ex.name}</h3>
              <p>{ex.desc}</p>
              <div className="exercise-meta">
                <span><Clock size={14} /> {ex.duration} min</span>
                <span><BarChart3 size={14} /> {ex.difficulty}</span>
              </div>
            </div>
            <button className="play-btn"><Play size={18} /></button>
          </div>
        ))}
      </div>
    </div>
  )
}
