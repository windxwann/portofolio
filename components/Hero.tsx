'use client'

import { useEffect, useState } from 'react'
import { Profile } from '@/types'
import { Mail, MapPin, Phone } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import { LinkedinIcon } from '@/components/LinkedinIcon'

export default function Hero() {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
  }, [])

  return (
    <section id="home" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Main Pokedex panel */}
      <div className="bg-pokedex-red rounded-2xl border-4 border-pokedex-black shadow-[8px_8px_0_#000] overflow-hidden">

        {/* Top bar with lights */}
        <div className="flex items-center gap-4 px-6 py-3 bg-pokedex-red-dark border-b-4 border-pokedex-black">
          <div className="w-12 h-12 rounded-full bg-pokedex-blue border-4 border-white shadow-[0_0_0_3px_#1a1a1a,0_0_12px_rgba(0,85,164,0.6)] flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white opacity-50" />
          </div>
          <div className="flex gap-2">
            <div className="w-4 h-4 rounded-full bg-red-300 border-2 border-black shadow-[2px_2px_0_#000]" />
            <div className="w-4 h-4 rounded-full bg-yellow-300 border-2 border-black shadow-[2px_2px_0_#000]" />
            <div className="w-4 h-4 rounded-full bg-green-300 border-2 border-black shadow-[2px_2px_0_#000]" />
          </div>
          <span className="font-press-start text-white text-xs ml-auto hidden sm:block tracking-widest">
            TRAINER CARD
          </span>
        </div>

        {/* Content area */}
        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* LEFT: Profile Screen */}
            <div className="flex flex-col gap-4">
              {/* Screen / avatar box */}
              <div className="relative bg-pokedex-screen-dark rounded-xl border-4 border-black p-4 shadow-[inset_0_0_12px_rgba(0,0,0,0.6),4px_4px_0_#000] scanlines">
                <div className="flex items-center justify-center min-h-[200px]">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-40 h-40 object-cover rounded-lg border-4 border-pokedex-screen shadow-[0_0_16px_rgba(155,188,15,0.6)]"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-lg border-4 border-pokedex-screen bg-pokedex-screen-dark flex items-center justify-center shadow-[0_0_16px_rgba(155,188,15,0.6)]">
                      <span className="font-press-start text-pokedex-screen text-4xl">?</span>
                    </div>
                  )}
                </div>
                {/* Screen label */}
                <div className="absolute bottom-3 right-4 font-press-start text-pokedex-screen text-[10px] opacity-70">
                  TRAINER ID
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-pokedex-black rounded-lg border-3 border-black p-4 space-y-2 retro-border">
                {profile?.email && (
                  <div className="flex items-center gap-3 text-pokedex-screen font-vt323 text-xl">
                    <Mail size={16} className="text-pokedex-yellow shrink-0" />
                    <span>{profile.email}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center gap-3 text-pokedex-screen font-vt323 text-xl">
                    <Phone size={16} className="text-pokedex-yellow shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center gap-3 text-pokedex-screen font-vt323 text-xl">
                    <MapPin size={16} className="text-pokedex-yellow shrink-0" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {/* Social links */}
                <div className="flex gap-3 pt-2">
                  {profile?.github && (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer"
                      className="retro-btn bg-pokedex-dark text-white px-3 py-1.5 flex items-center gap-2 text-base">
                      <GithubIcon size={18} /> GITHUB
                    </a>
                  )}
                  {profile?.linkedin && (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                      className="retro-btn bg-pokedex-blue text-white px-3 py-1.5 flex items-center gap-2 text-base">
                      <LinkedinIcon size={18} /> LINKEDIN
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: Trainer Info Panel */}
            <div className="flex flex-col gap-4">
              {/* Name & Title block */}
              <div className="bg-pokedex-light rounded-lg p-5 retro-border-light">
                <p className="font-press-start text-pokedex-red text-xs mb-1 tracking-widest">TRAINER NAME</p>
                <h1 className="font-press-start text-pokedex-black text-2xl lg:text-3xl leading-tight mb-3">
                  {profile?.name ?? '???'}
                </h1>
                <p className="font-press-start text-pokedex-gray text-xs tracking-wider">{profile?.title ?? 'Full-Stack Developer'}</p>
              </div>

              {/* Bio / Pokedex description */}
              <div className="bg-pokedex-screen-dark rounded-lg p-4 retro-border-screen flex-1 relative overflow-hidden scanlines">
                <p className="font-press-start text-[10px] text-pokedex-screen opacity-70 mb-2 tracking-widest">POKEDEX DATA:</p>
                <p className="font-vt323 text-pokedex-screen text-xl leading-relaxed">
                  {profile?.bio ?? 'A passionate developer who builds beautiful and functional web applications. Strong in both frontend and backend technologies. Currently searching for new adventures.'}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <a href="#about" className="retro-btn bg-pokedex-yellow text-pokedex-black px-5 py-2 font-press-start text-xs">
                  ► ABOUT
                </a>
                <a href="#projects" className="retro-btn bg-pokedex-red-dark text-white px-5 py-2 font-press-start text-xs">
                  ► PROJECTS
                </a>
                <a href="#contact" className="retro-btn bg-pokedex-dark text-white px-5 py-2 font-press-start text-xs">
                  ► CONTACT
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}