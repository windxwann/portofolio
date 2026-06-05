'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddProject() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    demoUrl: '',
    githubUrl: '',
    featured: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const data = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
    }

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push('/admin/projects')
      } else {
        const d = await res.json()
        setError(d.error || 'Failed to save project.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-pokedex-black border-2 border-pokedex-gray text-pokedex-screen font-vt323 text-xl px-4 py-2 rounded focus:outline-none focus:border-pokedex-screen placeholder:text-pokedex-gray placeholder:opacity-50 transition-colors'

  const labelClass = 'block font-press-start text-[9px] text-pokedex-light mb-2 tracking-widest uppercase'

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">NEW PROJECT ENTRY</span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">Fill in the project details below</p>
          <Link
            href="/admin/projects"
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
          <span className="font-press-start text-pokedex-light text-[9px] tracking-widest">PROJECT DATA FORM</span>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Title */}
          <div>
            <label className={labelClass}>Project Title *</label>
            <input
              type="text"
              required
              placeholder="My Awesome Project"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              required
              rows={4}
              placeholder="Describe your project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Technologies */}
          <div>
            <label className={labelClass}>Technologies (comma-separated) *</label>
            <input
              type="text"
              required
              placeholder="React, TypeScript, TailwindCSS"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              className={inputClass}
            />
            {formData.technologies && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.technologies.split(',').map((t, i) =>
                  t.trim() ? (
                    <span key={i} className="px-2 py-0.5 bg-pokedex-black text-pokedex-screen font-vt323 text-sm border border-pokedex-gray rounded">
                      {t.trim()}
                    </span>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Demo URL */}
          <div>
            <label className={labelClass}>Demo URL</label>
            <input
              type="url"
              placeholder="https://myproject.com"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className={labelClass}>GitHub URL</label>
            <input
              type="url"
              placeholder="https://github.com/user/repo"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Featured toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                className={`relative w-12 h-6 rounded border-2 transition-all duration-200 shrink-0 ${
                  formData.featured
                    ? 'bg-pokedex-screen border-pokedex-screen shadow-[0_0_6px_rgba(155,188,15,0.4)]'
                    : 'bg-pokedex-black border-pokedex-gray'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-pokedex-black border-2 rounded transition-all duration-200 ${
                    formData.featured ? 'left-6 border-pokedex-screen-dark' : 'left-0.5 border-pokedex-gray'
                  }`}
                />
              </div>
              <div>
                <p className="font-press-start text-[9px] text-pokedex-light tracking-widest">FEATURED PROJECT</p>
                <p className="font-vt323 text-pokedex-gray text-lg">Show on the featured section of the portfolio</p>
              </div>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 border-t-2 border-pokedex-black">
            <button
              type="submit"
              disabled={loading}
              className="retro-btn bg-pokedex-screen-dark text-pokedex-screen border-pokedex-screen px-6 py-2 font-press-start text-[9px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex-1"
            >
              {loading ? '▶ SAVING...' : '► SAVE PROJECT'}
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