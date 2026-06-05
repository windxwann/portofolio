'use client'

import { useEffect, useState } from 'react'
import { Profile } from '@/types'
import { Save } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

export default function AdminProfile() {
  const [profile, setProfile] = useState<Partial<Profile>>({
    name: '',
    title: '',
    bio: '',
    description: '',
    avatar: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    instagram: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      const data = await res.json()
      if (data) setProfile(data)
    } catch (err) {
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const d = await res.json()
        setError(d.error || 'Failed to save profile.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full bg-pokedex-black border-2 border-pokedex-gray text-pokedex-screen font-vt323 text-xl px-4 py-2 rounded focus:outline-none focus:border-pokedex-screen placeholder:text-pokedex-gray placeholder:opacity-50 transition-colors'

  const labelClass =
    'block font-press-start text-[9px] text-pokedex-light mb-2 tracking-widest uppercase'

  if (loading) {
    return (
      <div className="bg-pokedex-screen-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-8 text-center scanlines">
        <span className="font-press-start text-pokedex-screen text-xs blink">▶ LOADING TRAINER DATA...</span>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">TRAINER CARD EDITOR</span>
        </div>
        <div className="px-5 py-3">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">
            Edit your public profile information
          </p>
        </div>
      </div>

      {/* Feedback */}
      {success && (
        <div className="px-4 py-2 bg-pokedex-screen-dark border-2 border-pokedex-screen rounded shadow-[2px_2px_0_#000]">
          <p className="font-press-start text-[9px] text-pokedex-screen tracking-wider">
            ✓ PROFILE SAVED SUCCESSFULLY
          </p>
        </div>
      )}
      {error && (
        <div className="px-4 py-2 bg-pokedex-black border-2 border-pokedex-red rounded shadow-[2px_2px_0_#000]">
          <p className="font-press-start text-[9px] text-red-400 tracking-wider">✕ {error}</p>
        </div>
      )}

      {/* Form */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="px-5 py-3 bg-pokedex-red-dark border-b-4 border-black flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pokedex-screen blink" />
          <span className="font-press-start text-pokedex-light text-[9px] tracking-widest">TRAINER DATA FORM</span>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Avatar preview */}
          {profile.avatar && (
            <div className="flex items-center gap-4 p-4 bg-pokedex-screen-dark border-4 border-black rounded-lg scanlines">
              <img
                src={profile.avatar}
                alt="Avatar preview"
                className="w-16 h-16 object-cover rounded border-4 border-pokedex-screen shadow-[0_0_10px_rgba(155,188,15,0.5)]"
              />
              <div>
                <p className="font-press-start text-[8px] text-pokedex-screen opacity-70 tracking-widest mb-1">AVATAR PREVIEW</p>
                <p className="font-vt323 text-pokedex-screen text-lg truncate max-w-xs">{profile.avatar}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" required placeholder="Ash Ketchum"
                value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Title *</label>
              <input type="text" required placeholder="Full-Stack Developer"
                value={profile.title || ''} onChange={e => setProfile({ ...profile, title: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Bio / Pokédex Data *</label>
            <textarea required rows={3} placeholder="Short bio shown on trainer card..."
              value={profile.bio || ''} onChange={e => setProfile({ ...profile, bio: e.target.value })}
              className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className={labelClass}>Description / Who Am I?</label>
            <textarea rows={4} placeholder="Ceritakan lebih lanjut tentang dirimu di bagian About..."
              value={profile.description || ''} onChange={e => setProfile({ ...profile, description: e.target.value })}
              className={`${inputClass} resize-none`} />
            <p className="font-vt323 text-pokedex-gray text-base mt-1 opacity-70">Tampil di bagian WHO AM I? pada halaman About</p>
          </div>

          <div>
            <ImageUpload
              label="Avatar Image"
              currentImage={profile.avatar}
              onUpload={(base64) => setProfile({ ...profile, avatar: base64 })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" required placeholder="trainer@pokecenter.com"
                value={profile.email || ''} onChange={e => setProfile({ ...profile, email: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" placeholder="+1 234 567 8900"
                value={profile.phone || ''} onChange={e => setProfile({ ...profile, phone: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Location</label>
            <input type="text" placeholder="Pallet Town, Kanto"
              value={profile.location || ''} onChange={e => setProfile({ ...profile, location: e.target.value })}
              className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input type="url" placeholder="https://github.com/user"
                value={profile.github || ''} onChange={e => setProfile({ ...profile, github: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input type="url" placeholder="https://linkedin.com/in/user"
                value={profile.linkedin || ''} onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Instagram URL</label>
            <input type="url" placeholder="https://instagram.com/user"
              value={(profile as any).instagram || ''} onChange={e => setProfile({ ...profile, instagram: e.target.value } as any)}
              className={inputClass} />
          </div>

          <div className="pt-2 border-t-2 border-pokedex-black">
            <button
              type="submit"
              disabled={saving}
              className="retro-btn bg-pokedex-screen-dark text-pokedex-screen border-pokedex-screen w-full py-2.5 font-press-start text-[9px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Save size={14} />
              {saving ? '▶ SAVING TRAINER DATA...' : '► SAVE TRAINER CARD'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
