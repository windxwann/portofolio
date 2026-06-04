'use client'

import { useEffect, useState } from 'react'
import { Education as EducationType, Experience } from '@/types'
import { Calendar, GraduationCap, Briefcase } from 'lucide-react'

export default function Education() {
  const [education, setEducation] = useState<EducationType[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [eduRes, expRes] = await Promise.all([
        fetch('/api/education'),
        fetch('/api/experiences')
      ])
      setEducation(await eduRes.json())
      setExperiences(await expRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="education" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-pokedex-dark rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Header */}
        <div className="bg-pokedex-blue px-6 py-3 border-b-4 border-black flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-pokedex-screen border-2 border-black blink" />
          <span className="font-press-start text-white text-xs tracking-widest">TRAINER HISTORY</span>
        </div>

        <div className="p-6 lg:p-8">
          {loading ? (
            <div className="text-center py-12 font-press-start text-pokedex-screen text-sm">
              <span className="blink">▶ LOADING DATA...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Education Column */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-pokedex-yellow rounded-lg p-2 border-3 border-black retro-border">
                    <GraduationCap size={22} className="text-pokedex-black" />
                  </div>
                  <h2 className="font-press-start text-pokedex-yellow text-xs tracking-widest">ACADEMY LOG</h2>
                </div>

                <div className="space-y-4">
                  {education.length === 0 ? (
                    <div className="bg-pokedex-black rounded-lg p-4 retro-border text-center">
                      <p className="font-vt323 text-pokedex-gray text-xl">No education records yet.</p>
                    </div>
                  ) : education.map((edu) => (
                    <div key={edu.id} className="bg-pokedex-black rounded-xl border-3 border-black retro-border overflow-hidden">
                      <div className="bg-pokedex-yellow px-4 py-2 border-b-3 border-black">
                        <h3 className="font-press-start text-pokedex-black text-[10px] leading-tight">
                          {edu.degree}
                        </h3>
                      </div>
                      <div className="p-4">
                        <p className="font-vt323 text-pokedex-light text-xl mb-1">{edu.field}</p>
                        <p className="font-vt323 text-pokedex-yellow text-lg mb-2">{edu.institution}</p>
                        <div className="flex items-center gap-2 font-vt323 text-pokedex-gray text-lg">
                          <Calendar size={14} />
                          <span>
                            {new Date(edu.startDate).getFullYear()} —{' '}
                            {edu.current ? 'PRESENT' : edu.endDate ? new Date(edu.endDate).getFullYear() : ''}
                          </span>
                        </div>
                        {edu.description && (
                          <p className="mt-2 font-vt323 text-pokedex-gray text-lg">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Column */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-pokedex-red rounded-lg p-2 border-3 border-black retro-border">
                    <Briefcase size={22} className="text-white" />
                  </div>
                  <h2 className="font-press-start text-pokedex-red text-xs tracking-widest">BATTLE RECORD</h2>
                </div>

                <div className="space-y-4">
                  {experiences.length === 0 ? (
                    <div className="bg-pokedex-black rounded-lg p-4 retro-border text-center">
                      <p className="font-vt323 text-pokedex-gray text-xl">No experience records yet.</p>
                    </div>
                  ) : experiences.map((exp) => (
                    <div key={exp.id} className="bg-pokedex-black rounded-xl border-3 border-black retro-border overflow-hidden">
                      <div className="bg-pokedex-red px-4 py-2 border-b-3 border-black">
                        <h3 className="font-press-start text-white text-[10px] leading-tight">
                          {exp.position}
                        </h3>
                      </div>
                      <div className="p-4">
                        <p className="font-vt323 text-pokedex-yellow text-xl mb-1">{exp.company}</p>
                        {exp.location && (
                          <p className="font-vt323 text-pokedex-gray text-lg mb-2">📍 {exp.location}</p>
                        )}
                        <div className="flex items-center gap-2 font-vt323 text-pokedex-gray text-lg">
                          <Calendar size={14} />
                          <span>
                            {new Date(exp.startDate).getFullYear()} —{' '}
                            {exp.current ? 'PRESENT' : exp.endDate ? new Date(exp.endDate).getFullYear() : ''}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="mt-2 font-vt323 text-pokedex-gray text-lg">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </section>
  )
}
