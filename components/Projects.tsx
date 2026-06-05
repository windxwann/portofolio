'use client'

import { useEffect, useState } from 'react'
import { Project } from '@/types'
import { ExternalLink, Info } from 'lucide-react'
import { GithubIcon } from '@/components/GithubIcon'
import Image from 'next/image'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

  return (
    <section id="projects" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-pokedex-dark rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Header */}
        <div className="bg-pokedex-red-dark px-6 py-3 border-b-4 border-black flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-red-400 border-2 border-black blink" />
          <span className="font-press-start text-white text-xs tracking-widest">WILD ENCOUNTERS</span>
          <span className="font-vt323 text-pokedex-light text-lg ml-auto opacity-70">
            {projects.length} FOUND
          </span>
        </div>

        <div className="p-6 lg:p-8">
          {loading ? (
            <div className="text-center py-12 font-press-start text-pokedex-screen text-sm">
              <span className="blink">▶ SEARCHING AREA...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-press-start text-pokedex-light text-xs mb-4">NO PROJECTS FOUND.</p>
              <p className="font-vt323 text-pokedex-gray text-xl">The area seems empty. Add projects to start.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-pokedex-black rounded-xl border-3 border-black retro-border overflow-hidden group hover:translate-y-[-4px] transition-transform duration-200"
                >
                  {/* Card screen / image area */}
                  <div className="relative h-44 bg-pokedex-screen-dark border-b-3 border-black scanlines overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="font-press-start text-pokedex-screen text-4xl opacity-40">
                          #{String(index + 1).padStart(3, '0')}
                        </span>
                      </div>
                    )}
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-pokedex-yellow border-2 border-black px-2 py-0.5">
                        <span className="font-press-start text-black text-[8px]">★ RARE</span>
                      </div>
                    )}
                    {/* Number tag */}
                    <div className="absolute top-2 left-2 bg-pokedex-black border-2 border-black px-2 py-0.5 opacity-80">
                      <span className="font-press-start text-pokedex-screen text-[8px]">
                        #{String(index + 1).padStart(3, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="p-4">
                    <h3 className="font-press-start text-pokedex-light text-[11px] leading-snug mb-2">
                      {project.title}
                    </h3>
                    <p className="font-vt323 text-pokedex-gray text-lg leading-snug mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech tags / types */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-press-start text-[8px] bg-pokedex-dark text-pokedex-yellow border-2 border-black px-2 py-0.5"
                        >
                          {tech.toUpperCase()}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="font-press-start text-[8px] bg-pokedex-gray text-white border-2 border-black px-2 py-0.5">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="retro-btn bg-pokedex-blue text-white flex-1 px-2 py-1.5 flex items-center justify-center gap-1.5 text-sm"
                      >
                        <Info size={13} />
                        INFO
                      </button>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="retro-btn bg-pokedex-red text-white flex-1 px-2 py-1.5 flex items-center justify-center gap-1.5 text-sm"
                        >
                          <ExternalLink size={13} />
                          DEMO
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="retro-btn bg-pokedex-dark text-white flex-1 px-2 py-1.5 flex items-center justify-center gap-1.5 text-sm border-2 border-pokedex-gray"
                        >
                          <GithubIcon size={13} />
                          CODE
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-pokedex-light rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] w-full max-w-4xl max-h-[90vh] overflow-y-auto retro-border-light relative">
            {/* Modal Header */}
            <div className="bg-pokedex-red-dark px-4 py-3 border-b-4 border-black flex items-center gap-3 sticky top-0 z-10">
              <div className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black blink" />
              <span className="font-press-start text-white text-[10px] sm:text-xs tracking-widest truncate">
                DATA: {selectedProject.title.toUpperCase()}
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="ml-auto bg-pokedex-black text-white w-8 h-8 flex items-center justify-center border-2 border-black retro-btn text-xs font-press-start"
              >
                X
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-6">
              {/* Left: Image */}
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div className="bg-pokedex-screen-dark border-4 border-black p-2 rounded-lg retro-border-screen scanlines relative h-56 sm:h-72">
                  {selectedProject.image ? (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover border-2 border-pokedex-screen-dark opacity-90"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="font-press-start text-pokedex-screen text-4xl opacity-40">?</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Info */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div className="bg-white p-4 border-3 border-black retro-border">
                  <h2 className="font-press-start text-pokedex-black text-sm sm:text-base mb-3 leading-snug">
                    {selectedProject.title}
                  </h2>
                  <p className="font-vt323 text-pokedex-gray text-xl leading-relaxed whitespace-pre-wrap">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="bg-pokedex-black p-4 border-3 border-black retro-border">
                  <p className="font-press-start text-pokedex-yellow text-[9px] mb-3 tracking-widest">TECHNOLOGIES:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-press-start text-[9px] bg-pokedex-dark text-white border-2 border-black px-2 py-1"
                      >
                        {tech.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto pt-4">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-btn bg-pokedex-red text-white flex-1 py-3 flex items-center justify-center gap-2 text-sm"
                    >
                      <ExternalLink size={16} /> DEMO
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-btn bg-pokedex-dark text-white flex-1 py-3 flex items-center justify-center gap-2 text-sm"
                    >
                      <GithubIcon size={16} /> CODE
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
