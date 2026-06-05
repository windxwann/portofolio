'use client'

import { useEffect, useState } from 'react'
import { Education } from '@/types'
import { Plus, Edit2, Trash2, GraduationCap } from 'lucide-react'
import Link from 'next/link'

function formatDate(date?: Date | string | null) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchEducation() }, [])

  const fetchEducation = async () => {
    try {
      const res = await fetch('/api/education')
      const data = await res.json()
      setEducation(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching education:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('DELETE THIS EDUCATION RECORD? THIS CANNOT BE UNDONE.')) return
    try {
      const res = await fetch(`/api/education?id=${id}`, { method: 'DELETE' })
      if (res.ok) setEducation(education.filter(e => e.id !== id))
    } catch (err) {
      console.error('Error deleting education:', err)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">EDUCATION DATABASE</span>
          <span className="ml-auto font-vt323 text-pokedex-light text-lg opacity-70">
            {education.length} RECORDS
          </span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">
            Manage your education history
          </p>
          <Link
            href="/admin/education/new"
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
      {!loading && education.length === 0 && (
        <div className="bg-pokedex-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-10 text-center">
          <GraduationCap className="w-10 h-10 text-pokedex-gray mx-auto mb-3" />
          <p className="font-press-start text-pokedex-gray text-xs mb-3">NO EDUCATION RECORDS</p>
          <p className="font-vt323 text-pokedex-light text-xl mb-5">Add your academic history.</p>
          <Link href="/admin/education/new" className="retro-btn bg-pokedex-red text-white px-6 py-2 text-sm inline-block">
            ► ADD EDUCATION
          </Link>
        </div>
      )}

      {/* Education cards */}
      {!loading && education.length > 0 && (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden"
            >
              <div className="flex items-stretch">
                {/* Left accent bar */}
                <div className="w-1.5 bg-pokedex-yellow shrink-0" />

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Institution */}
                      <p className="font-press-start text-[10px] text-pokedex-yellow tracking-widest mb-1">
                        {edu.institution}
                      </p>
                      {/* Degree & field */}
                      <p className="font-vt323 text-pokedex-light text-xl leading-snug">
                        {edu.degree} — <span className="text-pokedex-screen">{edu.field}</span>
                      </p>
                      {/* Date range */}
                      <p className="font-press-start text-[8px] text-pokedex-gray tracking-widest mt-1">
                        {formatDate(edu.startDate)} → {edu.current ? 'PRESENT' : formatDate(edu.endDate)}
                        {edu.current && <span className="ml-2 text-pokedex-screen blink">●</span>}
                      </p>
                      {/* Description */}
                      {edu.description && (
                        <p className="font-vt323 text-pokedex-gray text-lg mt-2 leading-snug line-clamp-2">
                          {edu.description}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5 shrink-0">
                      <Link
                        href={`/admin/education/edit/${edu.id}`}
                        className="retro-btn bg-pokedex-blue text-white p-1.5 font-press-start text-[8px]"
                        title="Edit"
                      >
                        <Edit2 size={12} />
                      </Link>
                      <button
                        onClick={() => handleDelete(edu.id)}
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
