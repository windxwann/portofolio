'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = ['frontend', 'backend', 'database', 'tools', 'design']

export default function AddSkill() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    level: 50,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/skills')
      } else {
        const d = await res.json()
        setError(d.error || 'Failed to save skill.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const hpColor =
    formData.level >= 60
      ? 'hp-high'
      : formData.level >= 30
      ? 'hp-mid'
      : 'hp-low'

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
          <span className="font-press-start text-white text-[10px] tracking-widest">NEW SKILL ENTRY</span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">Register a new skill</p>
          <Link
            href="/admin/skills"
            className="font-press-start text-[8px] text-pokedex-gray hover:text-pokedex-light tracking-widest transition-colors"
          >
            ◄ BACK
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 py-2 bg-pokedex-black border-2 border-pokedex-red rounded shadow-[2px_2px_0_#000]">
          <p className="font-press-start text-[9px] text-red-400 tracking-wider">✕ {error}</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="px-5 py-3 bg-pokedex-red-dark border-b-4 border-black flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pokedex-screen blink" />
          <span className="font-press-start text-pokedex-light text-[9px] tracking-widest">SKILL DATA FORM</span>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>Skill Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. TypeScript"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`retro-btn px-4 py-1.5 font-press-start text-[8px] capitalize tracking-widest transition-all ${
                    formData.category === cat
                      ? 'bg-pokedex-screen-dark text-pokedex-screen border-pokedex-screen'
                      : 'bg-pokedex-black text-pokedex-gray border-pokedex-gray hover:border-pokedex-light hover:text-pokedex-light'
                  }`}
                >
                  {formData.category === cat ? '► ' : ''}{cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level with live HP bar preview */}
          <div>
            <label className={labelClass}>
              Proficiency Level — {formData.level}%
            </label>

            {/* HP Bar preview */}
            <div className="mb-3 bg-pokedex-screen-dark border-4 border-black rounded-lg p-4 scanlines">
              <p className="font-press-start text-[7px] text-pokedex-screen opacity-60 mb-3 tracking-widest">PREVIEW:</p>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-vt323 text-pokedex-screen text-xl">
                  {formData.name || 'SKILL NAME'}
                </span>
                <span className="font-press-start text-[8px] text-pokedex-gray">
                  LV.{Math.round(formData.level / 10)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-press-start text-[7px] text-pokedex-light w-4 shrink-0">HP</span>
                <div className="flex-1 h-3 bg-pokedex-black border-2 border-black rounded-sm overflow-hidden">
                  <div
                    className={`h-full rounded-sm transition-all duration-300 ${hpColor}`}
                    style={{ width: `${formData.level}%` }}
                  />
                </div>
                <span className="font-press-start text-[7px] text-pokedex-light w-10 text-right shrink-0">
                  {formData.level}/100
                </span>
              </div>
            </div>

            {/* Range slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full accent-[#9bbc0f] cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="font-press-start text-[7px] text-pokedex-gray">0</span>
              <span className="font-press-start text-[7px] text-pokedex-gray">50</span>
              <span className="font-press-start text-[7px] text-pokedex-gray">100</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 border-t-2 border-pokedex-black">
            <button
              type="submit"
              disabled={loading}
              className="retro-btn bg-pokedex-screen-dark text-pokedex-screen border-pokedex-screen px-6 py-2 font-press-start text-[9px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              {loading ? '▶ SAVING...' : '► SAVE SKILL'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="retro-btn bg-pokedex-dark text-pokedex-gray border-pokedex-gray px-5 py-2 font-press-start text-[9px] tracking-widest"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}