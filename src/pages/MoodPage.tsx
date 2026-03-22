import { useState } from 'react'
import { Save, CheckCircle } from 'lucide-react'
import './Pages.css'

const sliders = [
  { key: 'mood', label: 'Overall Mood', min: 'Very Poor', max: 'Excellent' },
  { key: 'anxiety', label: 'Anxiety Level', min: 'Calm', max: 'Very Anxious' },
  { key: 'energy', label: 'Energy Level', min: 'Tired', max: 'Energetic' },
  { key: 'sleep', label: 'Sleep Quality', min: 'Very Poor', max: 'Very Good' },
  { key: 'stress', label: 'Stress Level', min: 'Relaxed', max: 'Very High' },
]

export function MoodPage() {
  const [values, setValues] = useState<Record<string, number>>({ mood: 5, anxiety: 3, energy: 5, sleep: 5, stress: 3 })
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  const getMoodColor = (val: number) => {
    if (val <= 2) return 'var(--mood-very-poor)'
    if (val <= 4) return 'var(--mood-poor)'
    if (val <= 6) return 'var(--mood-okay)'
    if (val <= 8) return 'var(--mood-good)'
    return 'var(--mood-excellent)'
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="page">
      <h1 className="page-title">Mood Check-In</h1>

      <div className="card">
        <div className="sliders-grid">
          {sliders.map(({ key, label, min, max }) => (
            <div key={key} className="slider-group">
              <div className="slider-header">
                <span className="slider-label">{label}</span>
                <span className="slider-badge" style={{ background: getMoodColor(values[key]) }}>
                  {values[key]}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={values[key]}
                onChange={(e) => setValues({ ...values, [key]: +e.target.value })}
                className="mood-range"
                style={{ '--track-fill': getMoodColor(values[key]) } as React.CSSProperties}
              />
              <div className="slider-labels">
                <span>{min}</span>
                <span>{max}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="form-group" style={{ marginTop: 'var(--space-lg)' }}>
          <label>Notes (optional)</label>
          <textarea
            className="textarea"
            placeholder="How are you feeling today..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <button className="primary-btn" onClick={handleSave}>
          {saved ? <><CheckCircle size={18} /> Saved!</> : <><Save size={18} /> Save Entry</>}
        </button>
      </div>
    </div>
  )
}
