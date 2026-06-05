'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Skill } from '@/types'

const CATEGORIES = ['frontend', 'backend', 'database', 'tools', 'design']

export default function EditSkill({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: 'frontend',
    level: 50,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        const found = data.find((s: Skill) => s.id === parseInt(id))
        if (found) setFormData(found)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      const res = await fetch('/api/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/skills')
      } else {
        const d = await res.json()
        setError(d.error || 'Failed to update skill.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const level = formData.level ?? 0
  const hpColor =
    level >= 60 ? 'hp-high' : level >= 30 ? 'hp-mid' : 'hp-low'

  const inputClass =
    'w-full bg-pokedex-black border-2 border-pokedex-gray text-pokedex-screen font-vt323 text-xl px-4 py-2 rounded focus:outline-none focus:border-pokedex-screen placeholder:text-pokedex-gray placeholder:opacity-50 transition-colors'

  const labelClass =
    'block font-press-start text-[9px] text-pokedex-light mb-2 tracking-widest uppercase'

  if (loading) {
    return (
      <div className="bg-pokedex-screen-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-8 text-center scanlines">
        <span className="font-press-start text-pokedex-screen text-xs blink">▶ LOADING SKILL DATA...</span>
      </div>
    )
  }

  if (!formData.name && !loading) {
    return (
      <div className="bg-pokedex-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-10 text-center">
        <p className="font-press-start text-pokedex-red text-xs mb-3">SKILL NOT FOUND</p>
        <Link href="/admin/skills" className="retro-btn bg-pokedex-dark text-pokedex-gray border-pokedex-gray px-5 py-2 font-press-start text-[9px]">
          ◄ BACK TO SKILLS
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">EDIT SKILL ENTRY</span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">Modify skill data</p>
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
              value={formData.name || ''}
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
              Proficiency Level — {level}%
            </label>

            {/* HP Bar preview */}
            <div className="mb-3 bg-pokedex-screen-dark border-4 border-black rounded-lg p-4 scanlines">
              <p className="font-press-start text-[7px] text-pokedex-screen opacity-60 mb-3 tracking-widest">PREVIEW:</p>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-vt323 text-pokedex-screen text-xl">
                  {formData.name || 'SKILL NAME'}
                </span>
                <span className="font-press-start text-[8px] text-pokedex-gray">
                  LV.{Math.round(level / 10)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-press-start text-[7px] text-pokedex-light w-4 shrink-0">HP</span>
                <div className="flex-1 h-3 bg-pokedex-black border-2 border-black rounded-sm overflow-hidden">
                  <div
                    className={`h-full rounded-sm transition-all duration-300 ${hpColor}`}
                    style={{ width: `${level}%` }}
                  />
                </div>
                <span className="font-press-start text-[7px] text-pokedex-light w-10 text-right shrink-0">
                  {level}/100
                </span>
              </div>
            </div>

            {/* Range slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={level}
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
              disabled={saving}
              className="retro-btn bg-pokedex-screen-dark text-pokedex-screen border-pokedex-screen px-6 py-2 font-press-start text-[9px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              {saving ? '▶ SAVING...' : '► SAVE CHANGES'}
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
