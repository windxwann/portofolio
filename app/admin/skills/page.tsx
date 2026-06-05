'use client'

import { useEffect, useState } from 'react'
import { Skill } from '@/types'
import { Plus, Edit2, Trash2, Code, Server, Database, Wrench } from 'lucide-react'
import { FigmaIcon } from '@/components/FigmaIcon'
import Link from 'next/link'

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
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

export default function SkillsManagement() {
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

  const handleDelete = async (id: number) => {
    if (!confirm('DELETE THIS SKILL? THIS CANNOT BE UNDONE.')) return
    try {
      const res = await fetch(`/api/skills?id=${id}`, { method: 'DELETE' })
      if (res.ok) setSkills(skills.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting skill:', error)
    }
  }

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const hpColor = (level: number) =>
    level >= 60 ? 'hp-high' : level >= 30 ? 'hp-mid' : 'hp-low'

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">SKILLS DATABASE</span>
          <span className="ml-auto font-vt323 text-pokedex-light text-lg opacity-70">
            {skills.length} REGISTERED
          </span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">
            Manage your skill set
          </p>
          <Link
            href="/admin/skills/new"
            className="retro-btn bg-pokedex-screen-dark text-pokedex-screen border-pokedex-screen px-4 py-1.5 flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            ADD NEW
          </Link>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-pokedex-screen-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-8 text-center scanlines">
          <span className="font-press-start text-pokedex-screen text-xs blink">▶ LOADING DATA...</span>
        </div>
      )}

      {/* Empty */}
      {!loading && skills.length === 0 && (
        <div className="bg-pokedex-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-10 text-center">
          <p className="font-press-start text-pokedex-gray text-xs mb-3">NO SKILLS REGISTERED</p>
          <p className="font-vt323 text-pokedex-light text-xl mb-5">Start by adding your first skill.</p>
          <Link href="/admin/skills/new" className="retro-btn bg-pokedex-red text-white px-6 py-2 text-sm inline-block">
            ► ADD SKILL
          </Link>
        </div>
      )}

      {/* Skill groups */}
      {!loading && skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.entries(grouped).map(([category, categorySkills]) => {
            const Icon = categoryIcons[category] || Code
            const iconColor = categoryColors[category] || 'text-pokedex-yellow'
            return (
              <div
                key={category}
                className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 px-4 py-3 bg-pokedex-red-dark border-b-4 border-black">
                  <Icon size={18} className={iconColor} />
                  <h2 className="font-press-start text-pokedex-light text-[10px] capitalize tracking-widest">
                    {category}
                  </h2>
                  <span className="ml-auto font-vt323 text-pokedex-gray text-lg">
                    {categorySkills.length} MOVES
                  </span>
                </div>

                {/* Skills table */}
                <div className="divide-y-2 divide-pokedex-black">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="px-4 py-3 flex items-center gap-3 hover:bg-pokedex-black transition-colors group">
                      {/* Name + HP bar */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-vt323 text-pokedex-light text-xl truncate">{skill.name}</span>
                          <span className="font-press-start text-[8px] text-pokedex-gray ml-2 shrink-0">
                            LV.{Math.round(skill.level / 10)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-press-start text-[7px] text-pokedex-light w-4 shrink-0">HP</span>
                          <div className="flex-1 h-2.5 bg-pokedex-black border border-pokedex-gray rounded-sm overflow-hidden">
                            <div
                              className={`h-full rounded-sm transition-all duration-700 ${hpColor(skill.level)}`}
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="font-press-start text-[7px] text-pokedex-gray w-10 text-right shrink-0">
                            {skill.level}/100
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/skills/edit/${skill.id}`}
                          className="retro-btn bg-pokedex-blue text-white p-1.5 font-press-start text-[8px]"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </Link>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="retro-btn bg-pokedex-red text-white p-1.5 font-press-start text-[8px]"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}