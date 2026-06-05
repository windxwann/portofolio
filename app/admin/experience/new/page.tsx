'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddExperience() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
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
      const res = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/experience')
      } else {
        const d = await res.json()
        setError(d.error || 'Failed to save experience record.')
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
          <span className="font-press-start text-white text-[10px] tracking-widest">NEW EXPERIENCE RECORD</span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">Add a work experience entry</p>
          <Link href="/admin/experience" className="font-press-start text-[8px] text-pokedex-gray hover:text-pokedex-light tracking-widest transition-colors">
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
          <span className="font-press-start text-pokedex-light text-[9px] tracking-widest">EXPERIENCE DATA FORM</span>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Company *</label>
              <input type="text" required placeholder="Pokémon Corp"
                value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Position *</label>
              <input type="text" required placeholder="Senior Developer"
                value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <input type="text" placeholder="Pallet Town, Kanto"
              value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
              className={inputClass} />
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

          {/* Currently working */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
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
                <p className="font-press-start text-[9px] text-pokedex-light tracking-widest">CURRENTLY WORKING HERE</p>
                <p className="font-vt323 text-pokedex-gray text-lg">This is my current job</p>
              </div>
            </label>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea rows={3} placeholder="Key responsibilities, achievements, technologies used..."
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
