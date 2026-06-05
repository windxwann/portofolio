'use client'

import { useEffect, useState } from 'react'
import { Experience } from '@/types'
import { Plus, Edit2, Trash2, Briefcase } from 'lucide-react'
import Link from 'next/link'

function formatDate(date?: Date | string | null) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchExperiences() }, [])

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experiences')
      const data = await res.json()
      setExperiences(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching experiences:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('DELETE THIS EXPERIENCE RECORD? THIS CANNOT BE UNDONE.')) return
    try {
      const res = await fetch(`/api/experiences?id=${id}`, { method: 'DELETE' })
      if (res.ok) setExperiences(experiences.filter(e => e.id !== id))
    } catch (err) {
      console.error('Error deleting experience:', err)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">EXPERIENCE DATABASE</span>
          <span className="ml-auto font-vt323 text-pokedex-light text-lg opacity-70">
            {experiences.length} RECORDS
          </span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">
            Manage your work experience
          </p>
          <Link
            href="/admin/experience/new"
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
      {!loading && experiences.length === 0 && (
        <div className="bg-pokedex-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-10 text-center">
          <Briefcase className="w-10 h-10 text-pokedex-gray mx-auto mb-3" />
          <p className="font-press-start text-pokedex-gray text-xs mb-3">NO EXPERIENCE RECORDS</p>
          <p className="font-vt323 text-pokedex-light text-xl mb-5">Add your work history.</p>
          <Link href="/admin/experience/new" className="retro-btn bg-pokedex-red text-white px-6 py-2 text-sm inline-block">
            ► ADD EXPERIENCE
          </Link>
        </div>
      )}

      {/* Experience cards */}
      {!loading && experiences.length > 0 && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden"
            >
              <div className="flex items-stretch">
                {/* Left accent bar — red for experience */}
                <div className="w-1.5 bg-pokedex-red shrink-0" />

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Company */}
                      <p className="font-press-start text-[10px] text-pokedex-red tracking-widest mb-1">
                        {exp.company}
                        {exp.location && (
                          <span className="text-pokedex-gray font-press-start text-[8px] ml-2 normal-case">
                            · {exp.location}
                          </span>
                        )}
                      </p>
                      {/* Position */}
                      <p className="font-vt323 text-pokedex-light text-xl leading-snug">
                        {exp.position}
                      </p>
                      {/* Date range */}
                      <p className="font-press-start text-[8px] text-pokedex-gray tracking-widest mt-1">
                        {formatDate(exp.startDate)} → {exp.current ? 'PRESENT' : formatDate(exp.endDate)}
                        {exp.current && <span className="ml-2 text-pokedex-screen blink">●</span>}
                      </p>
                      {/* Description */}
                      {exp.description && (
                        <p className="font-vt323 text-pokedex-gray text-lg mt-2 leading-snug line-clamp-2">
                          {exp.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5 shrink-0">
                      <Link
                        href={`/admin/experience/edit/${exp.id}`}
                        className="retro-btn bg-pokedex-blue text-white p-1.5 font-press-start text-[8px]"
                        title="Edit"
                      >
                        <Edit2 size={12} />
                      </Link>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="retro-btn bg-pokedex-red text-white p-1.5 font-press-start text-[8px]"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
