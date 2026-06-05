'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddEducation() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const data = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.current || !formData.endDate ? null : new Date(formData.endDate).toISOString(),
    }

    try {
      const res = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/education')
      } else {
        const d = await res.json()
        setError(d.error || 'Failed to save education record.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-pokedex-black border-2 border-pokedex-gray text-pokedex-screen font-vt323 text-xl px-4 py-2 rounded focus:outline-none focus:border-pokedex-screen placeholder:text-pokedex-gray placeholder:opacity-50 transition-colors'

  const labelClass =
    'block font-press-start text-[9px] text-pokedex-light mb-2 tracking-widest uppercase'

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">NEW EDUCATION RECORD</span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">Add an academic entry</p>
          <Link href="/admin/education" className="font-press-start text-[8px] text-pokedex-gray hover:text-pokedex-light tracking-widest transition-colors">
            ◄ BACK
          </Link>
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 bg-pokedex-black border-2 border-pokedex-red rounded shadow-[2px_2px_0_#000]">
          <p className="font-press-start text-[9px] text-red-400 tracking-wider">✕ {error}</p>
        </div>
      )}

      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="px-5 py-3 bg-pokedex-red-dark border-b-4 border-black flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pokedex-screen blink" />
          <span className="font-press-start text-pokedex-light text-[9px] tracking-widest">EDUCATION DATA FORM</span>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className={labelClass}>Institution *</label>
            <input type="text" required placeholder="University of Kanto"
              value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })}
              className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Degree *</label>
              <input type="text" required placeholder="Bachelor of Science"
                value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Field of Study *</label>
              <input type="text" required placeholder="Computer Science"
                value={formData.field} onChange={e => setFormData({ ...formData, field: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Start Date *</label>
              <input type="month" required
                value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input type="month"
                value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                disabled={formData.current}
                className={`${inputClass} disabled:opacity-30 disabled:cursor-not-allowed`} />
            </div>
          </div>

          {/* Currently studying */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => setFormData({ ...formData, current: !formData.current })}
                className={`relative w-12 h-6 rounded border-2 transition-all duration-200 shrink-0 ${
                  formData.current
                    ? 'bg-pokedex-screen border-pokedex-screen shadow-[0_0_6px_rgba(155,188,15,0.4)]'
                    : 'bg-pokedex-black border-pokedex-gray'
                }`}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-pokedex-black border-2 rounded transition-all duration-200 ${
                  formData.current ? 'left-6 border-pokedex-screen-dark' : 'left-0.5 border-pokedex-gray'
                }`} />
              </div>
              <div>
                <p className="font-press-start text-[9px] text-pokedex-light tracking-widest">CURRENTLY STUDYING</p>
                <p className="font-vt323 text-pokedex-gray text-lg">I am currently enrolled here</p>
              </div>
            </label>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea rows={3} placeholder="Notable achievements, coursework, activities..."
              value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
              className={`${inputClass} resize-none`} />
          </div>

          <div className="flex gap-3 pt-2 border-t-2 border-pokedex-black">
            <button type="submit" disabled={loading}
              className="retro-btn bg-pokedex-screen-dark text-pokedex-screen border-pokedex-screen px-6 py-2 font-press-start text-[9px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex-1">
              {loading ? '▶ SAVING...' : '► SAVE RECORD'}
            </button>
            <button type="button" onClick={() => router.back()}
              className="retro-btn bg-pokedex-dark text-pokedex-gray border-pokedex-gray px-5 py-2 font-press-start text-[9px] tracking-widest">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
