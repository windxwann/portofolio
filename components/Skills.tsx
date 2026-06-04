'use client'

import { useEffect, useState } from 'react'
import { Skill } from '@/types'
import { Code, Database, Server, Wrench } from 'lucide-react'
import { FigmaIcon } from '@/components/FigmaIcon'

const categoryIcons: Record<string, any> = {
  frontend: Code,
  backend: Server,
  database: Database,
  tools: Wrench,
  design: FigmaIcon,
}

const categoryColors: Record<string, string> = {
  frontend: 'text-pokedex-blue',
  backend: 'text-red-400',
  database: 'text-pokedex-yellow',
  tools: 'text-green-400',
  design: 'text-purple-400',
}

function HpBar({ level }: { level: number }) {
  const colorClass = level >= 60 ? 'hp-high' : level >= 30 ? 'hp-mid' : 'hp-low'
  return (
    <div className="flex items-center gap-2">
      <span className="font-press-start text-[9px] text-pokedex-light w-4 shrink-0">HP</span>
      <div className="flex-1 h-3 bg-pokedex-black border-2 border-black rounded-sm overflow-hidden">
        <div
          className={`h-full rounded-sm transition-all duration-700 ${colorClass}`}
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="font-press-start text-[9px] text-pokedex-light w-10 text-right shrink-0">
        {level}/100
      </span>
    </div>
  )
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchSkills() }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      const data = await res.json()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-pokedex-dark rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Header */}
        <div className="bg-pokedex-red px-6 py-3 border-b-4 border-black flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-pokedex-yellow border-2 border-black blink" />
          <span className="font-press-start text-white text-xs tracking-widest">CURRENT ROSTER</span>
          <span className="font-vt323 text-pokedex-light text-lg ml-auto opacity-70">
            {skills.length} SKILLS REGISTERED
          </span>
        </div>

        <div className="p-6 lg:p-8">
          {loading ? (
            <div className="text-center py-12 font-press-start text-pokedex-screen text-sm">
              <span className="blink">▶ LOADING DATA...</span>
            </div>
          ) : Object.keys(groupedSkills).length === 0 ? (
            <div className="text-center py-12">
              <p className="font-press-start text-pokedex-light text-xs">NO SKILLS REGISTERED YET.</p>
              <p className="font-vt323 text-pokedex-gray text-xl mt-2">Add skills via the admin panel.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => {
                const Icon = categoryIcons[category] || Code
                const iconColor = categoryColors[category] || 'text-pokedex-yellow'
                return (
                  <div key={category} className="bg-pokedex-black rounded-xl border-3 border-black retro-border overflow-hidden">
                    {/* Category header */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-pokedex-dark border-b-3 border-black">
                      <Icon className={`${iconColor} shrink-0`} size={22} />
                      <h2 className="font-press-start text-pokedex-light text-xs capitalize tracking-widest">
                        {category}
                      </h2>
                      <span className="ml-auto font-vt323 text-pokedex-gray text-lg">
                        {categorySkills.length} MOVES
                      </span>
                    </div>

                    <div className="p-4 space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-1.5">
                            <span className="font-vt323 text-pokedex-light text-xl">{skill.name}</span>
                            <span className="font-press-start text-[9px] text-pokedex-gray mt-1">
                              LV.{Math.round(skill.level / 10)}
                            </span>
                          </div>
                          <HpBar level={skill.level} />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
