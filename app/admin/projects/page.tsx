'use client'

import { useEffect, useState } from 'react'
import { Project } from '@/types'
import { Plus, Edit2, Trash2, ExternalLink, Star } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import Link from 'next/link'
import Image from 'next/image'

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('DELETE THIS PROJECT? THIS CANNOT BE UNDONE.')) return
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      if (res.ok) setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">PROJECTS DATABASE</span>
          <span className="ml-auto font-vt323 text-pokedex-light text-lg opacity-70">
            {projects.length} REGISTERED
          </span>
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="font-vt323 text-pokedex-light text-xl opacity-70">
            Manage your portfolio projects
          </p>
          <Link
            href="/admin/projects/new"
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

      {/* Empty state */}
      {!loading && projects.length === 0 && (
        <div className="bg-pokedex-dark border-4 border-black rounded-xl shadow-[4px_4px_0_#000] p-10 text-center">
          <p className="font-press-start text-pokedex-gray text-xs mb-3">NO PROJECTS REGISTERED</p>
          <p className="font-vt323 text-pokedex-light text-xl mb-5">Start by adding your first project.</p>
          <Link href="/admin/projects/new" className="retro-btn bg-pokedex-red text-white px-6 py-2 text-sm inline-block">
            ► ADD PROJECT
          </Link>
        </div>
      )}

      {/* Project cards */}
      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden"
            >
              {/* Project image */}
              {project.image && (
                <div className="relative h-40 border-b-4 border-black bg-pokedex-screen-dark scanlines">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pokedex-black via-transparent to-transparent" />
                </div>
              )}

              {/* Card content */}
              <div className="p-4">
                {/* Title row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-press-start text-pokedex-light text-[11px] leading-tight tracking-wide">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="flex items-center gap-1 shrink-0 px-2 py-0.5 bg-pokedex-yellow text-pokedex-black font-press-start text-[7px] border-2 border-black shadow-[1px_1px_0_#000]">
                      <Star size={8} fill="currentColor" /> FEATURED
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="font-vt323 text-pokedex-gray text-lg leading-snug mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-pokedex-black text-pokedex-screen font-vt323 text-sm border border-pokedex-gray rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t-2 border-pokedex-black pt-3">
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-press-start text-[8px] text-pokedex-blue hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink size={14} /> DEMO
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-press-start text-[8px] text-pokedex-gray hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <GithubIcon size={14} /> CODE
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="retro-btn bg-pokedex-blue text-white px-3 py-1 text-[8px] font-press-start flex items-center gap-1"
                    >
                      <Edit2 size={11} /> EDIT
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="retro-btn bg-pokedex-red text-white px-3 py-1 text-[8px] font-press-start flex items-center gap-1"
                    >
                      <Trash2 size={11} /> DEL
                    </button>
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