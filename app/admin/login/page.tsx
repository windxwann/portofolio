'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'ACCESS DENIED')
      }
    } catch {
      setError('CONNECTION ERROR. TRY AGAIN.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-pokedex-black font-vt323 flex items-center justify-center px-4 py-12">
      {/* Outer Pokédex shell */}
      <div className="w-full max-w-md">
        {/* Top bar with lights */}
        <div className="flex items-center gap-3 px-5 py-3 bg-pokedex-red border-4 border-pokedex-black rounded-t-2xl shadow-[4px_0_0_#000,-4px_0_0_#000,0_-4px_0_#000]">
          <div className="w-10 h-10 rounded-full bg-pokedex-blue border-4 border-white shadow-[0_0_0_2px_#1a1a1a,0_0_10px_rgba(0,85,164,0.6)] flex items-center justify-center shrink-0">
            <div className="w-4 h-4 rounded-full bg-white opacity-50" />
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300 border border-black shadow-[1px_1px_0_#000]" />
            <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black shadow-[1px_1px_0_#000]" />
            <div className="w-3 h-3 rounded-full bg-green-300 border border-black shadow-[1px_1px_0_#000] blink" />
          </div>
          <span className="ml-auto font-press-start text-white text-[9px] tracking-widest hidden sm:block">
            ADMIN ACCESS
          </span>
        </div>

        {/* Main panel */}
        <div className="bg-pokedex-dark border-x-4 border-pokedex-black px-6 py-6">
          {/* Screen terminal */}
          <div className="relative bg-pokedex-screen-dark border-4 border-black rounded-lg p-5 mb-5 shadow-[inset_0_0_12px_rgba(0,0,0,0.6),4px_4px_0_#000] scanlines overflow-hidden">
            <p className="font-press-start text-[9px] text-pokedex-screen opacity-60 mb-3 tracking-widest">
              POKÉDEX ADMIN SYSTEM
            </p>
            <p className="font-press-start text-pokedex-screen text-[11px] mb-1">
              TRAINER AUTHENTICATION
            </p>
            <p className="font-vt323 text-pokedex-screen text-xl opacity-80">
              Enter your credentials to access<br />the administration panel.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pokedex-screen blink" />
              <span className="font-press-start text-[8px] text-pokedex-screen opacity-70 tracking-widest">
                {loading ? 'AUTHENTICATING...' : 'AWAITING INPUT'}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-2 bg-pokedex-black border-2 border-pokedex-red rounded shadow-[2px_2px_0_#000]">
              <p className="font-press-start text-[9px] text-red-400 tracking-wider">
                ✕ {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-press-start text-[9px] text-pokedex-light mb-2 tracking-widest uppercase">
                Trainer ID (Email)
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="trainer@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-pokedex-black border-2 border-pokedex-gray text-pokedex-screen font-vt323 text-xl px-4 py-2 rounded focus:outline-none focus:border-pokedex-screen placeholder:text-pokedex-gray placeholder:opacity-50 transition-colors"
              />
            </div>

            <div>
              <label className="block font-press-start text-[9px] text-pokedex-light mb-2 tracking-widest uppercase">
                Secret Code (Password)
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-pokedex-black border-2 border-pokedex-gray text-pokedex-screen font-vt323 text-xl px-4 py-2 rounded focus:outline-none focus:border-pokedex-screen placeholder:text-pokedex-gray placeholder:opacity-50 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="retro-btn w-full bg-pokedex-red text-white px-6 py-3 font-press-start text-[10px] tracking-widest disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? '▶ AUTHENTICATING...' : '► ACCESS SYSTEM'}
            </button>
          </form>
        </div>

        {/* Bottom panel */}
        <div className="bg-pokedex-red-dark border-4 border-t-0 border-pokedex-black rounded-b-2xl px-5 py-3 shadow-[4px_4px_0_#000,-4px_4px_0_#000]">
          <p className="font-press-start text-[8px] text-pokedex-light opacity-60 text-center tracking-widest">
            UNAUTHORIZED ACCESS IS PROHIBITED
          </p>
        </div>
      </div>
    </div>
  )
}