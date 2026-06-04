'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

function Pokeball({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#f5f5dc" stroke="#1a1a1a" strokeWidth="4" />
      <path d="M2 50 Q2 2 50 2 Q98 2 98 50" fill="#cc0000" />
      <rect x="2" y="46" width="96" height="8" fill="#1a1a1a" />
      <circle cx="50" cy="50" r="14" fill="#f5f5dc" stroke="#1a1a1a" strokeWidth="4" />
      <circle cx="50" cy="50" r="7" fill="white" stroke="#1a1a1a" strokeWidth="2" />
    </svg>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
      <div className="bg-pokedex-dark rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Header */}
        <div className="bg-pokedex-red px-6 py-3 border-b-4 border-black flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-white border-2 border-black blink" />
          <span className="font-press-start text-white text-xs tracking-widest">CONTACT AGENT</span>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left: Contact info + Pokeball decor */}
            <div className="flex flex-col gap-5">
              <div className="bg-pokedex-black rounded-xl p-5 retro-border">
                <p className="font-press-start text-pokedex-yellow text-[9px] tracking-widest mb-4">SIGNAL DETECTED:</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-pokedex-red rounded p-1.5 border-2 border-black">
                      <Mail size={16} className="text-white" />
                    </div>
                    <span className="font-vt323 text-pokedex-light text-xl">your.email@example.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-pokedex-blue rounded p-1.5 border-2 border-black">
                      <Phone size={16} className="text-white" />
                    </div>
                    <span className="font-vt323 text-pokedex-light text-xl">+62 123 4567 890</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-700 rounded p-1.5 border-2 border-black">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <span className="font-vt323 text-pokedex-light text-xl">Jakarta, Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Pokeball decoration */}
              <div className="flex items-center justify-center py-4">
                <Pokeball className="w-28 h-28 pokeball-spin opacity-70" />
              </div>

              <div className="bg-pokedex-screen-dark rounded-lg p-4 border-4 border-black retro-border-screen relative scanlines">
                <p className="font-press-start text-pokedex-screen text-[9px] mb-2">SYSTEM MSG:</p>
                <p className="font-vt323 text-pokedex-screen text-xl leading-relaxed">
                  A wild developer has appeared! Use this form to start a battle... or a collaboration. Your choice, trainer.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-press-start text-pokedex-yellow text-[9px] tracking-widest block mb-2">
                    TRAINER NAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name..."
                    className="w-full bg-pokedex-black font-vt323 text-pokedex-screen text-xl px-4 py-3 border-3 border-black retro-border focus:outline-none focus:border-pokedex-yellow placeholder:text-pokedex-gray"
                  />
                </div>

                <div>
                  <label className="font-press-start text-pokedex-yellow text-[9px] tracking-widest block mb-2">
                    POKECENTER MAIL:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-pokedex-black font-vt323 text-pokedex-screen text-xl px-4 py-3 border-3 border-black retro-border focus:outline-none focus:border-pokedex-yellow placeholder:text-pokedex-gray"
                  />
                </div>

                <div>
                  <label className="font-press-start text-pokedex-yellow text-[9px] tracking-widest block mb-2">
                    BATTLE MESSAGE:
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="What would you like to say?"
                    className="w-full bg-pokedex-black font-vt323 text-pokedex-screen text-xl px-4 py-3 border-3 border-black retro-border focus:outline-none focus:border-pokedex-yellow placeholder:text-pokedex-gray resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="retro-btn w-full bg-pokedex-red text-white py-3 font-press-start text-xs flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Send size={16} />
                  {status === 'sending' ? '▶ SENDING...' : '► SEND MESSAGE'}
                </button>

                {status === 'success' && (
                  <div className="bg-green-900 border-3 border-black p-3 text-center retro-border">
                    <p className="font-press-start text-green-300 text-[9px]">✓ MESSAGE DELIVERED!</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="bg-red-900 border-3 border-black p-3 text-center retro-border">
                    <p className="font-press-start text-red-300 text-[9px]">✗ TRANSMISSION FAILED. TRY AGAIN.</p>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pb-4">
        <p className="font-press-start text-pokedex-gray text-[9px] tracking-widest">
          © {new Date().getFullYear()} — BUILT WITH ♥ & NEXT.JS
        </p>
      </div>
    </section>
  )
}
