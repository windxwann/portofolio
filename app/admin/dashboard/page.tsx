'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FolderGit2, Code, GraduationCap, Briefcase, Plus } from 'lucide-react'

interface Stats {
  projects: number
  skills: number
  education: number
  experience: number
}

const statCards = [
  {
    title: 'PROJECTS',
    key: 'projects' as keyof Stats,
    icon: FolderGit2,
    color: 'text-pokedex-blue',
    addHref: '/admin/projects/new',
    listHref: '/admin/projects',
    label: 'ENTRIES',
  },
  {
    title: 'SKILLS',
    key: 'skills' as keyof Stats,
    icon: Code,
    color: 'text-pokedex-screen',
    addHref: '/admin/skills/new',
    listHref: '/admin/skills',
    label: 'REGISTERED',
  },
  {
    title: 'EDUCATION',
    key: 'education' as keyof Stats,
    icon: GraduationCap,
    color: 'text-pokedex-yellow',
    addHref: '/admin/education/new',
    listHref: '/admin/education',
    label: 'RECORDS',
  },
  {
    title: 'EXPERIENCE',
    key: 'experience' as keyof Stats,
    icon: Briefcase,
    color: 'text-red-400',
    addHref: '/admin/experience/new',
    listHref: '/admin/experience',
    label: 'ENTRIES',
  },
]

const quickActions = [
  { label: 'ADD PROJECT', href: '/admin/projects/new', icon: FolderGit2 },
  { label: 'ADD SKILL', href: '/admin/skills/new', icon: Code },
  { label: 'ADD EDUCATION', href: '/admin/education/new', icon: GraduationCap },
  { label: 'ADD EXPERIENCE', href: '/admin/experience/new', icon: Briefcase },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, skills: 0, education: 0, experience: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchStats() }, [])

  const fetchStats = async () => {
    try {
      const [projects, skills, education, experience] = await Promise.all([
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/skills').then(r => r.json()),
        fetch('/api/education').then(r => r.json()),
        fetch('/api/experiences').then(r => r.json()),
      ])
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        skills: Array.isArray(skills) ? skills.length : 0,
        education: Array.isArray(education) ? education.length : 0,
        experience: Array.isArray(experience) ? experience.length : 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-yellow blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">COMMAND CENTER</span>
          <span className="ml-auto font-vt323 text-pokedex-light text-lg opacity-70">DASHBOARD</span>
        </div>
        <div className="px-5 py-4">
          <p className="font-press-start text-pokedex-screen text-xs mb-1">SYSTEM STATUS</p>
          <p className="font-vt323 text-pokedex-light text-xl opacity-80">
            Welcome back, Trainer. All systems operational.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.key}
              href={card.listHref}
              className="block bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100"
            >
              <div className="px-4 py-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-press-start text-[8px] text-pokedex-gray tracking-widest mb-1">{card.title}</p>
                    {loading ? (
                      <div className="w-10 h-6 bg-pokedex-black rounded animate-pulse" />
                    ) : (
                      <p className="font-press-start text-2xl text-pokedex-light">{stats[card.key]}</p>
                    )}
                    <p className="font-vt323 text-pokedex-gray text-sm mt-0.5">{card.label}</p>
                  </div>
                  <div className={`p-2 bg-pokedex-black rounded border-2 border-pokedex-gray ${card.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="h-1 bg-pokedex-black rounded overflow-hidden">
                  <div
                    className={`h-full rounded hp-high transition-all duration-700`}
                    style={{ width: loading ? '0%' : '100%' }}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-pokedex-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="flex items-center gap-4 px-5 py-3 bg-pokedex-red-dark border-b-4 border-black">
          <div className="w-2 h-2 rounded-full bg-pokedex-screen blink" />
          <span className="font-press-start text-white text-[10px] tracking-widest">QUICK ACTIONS</span>
        </div>
        <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 bg-pokedex-black rounded-lg border-2 border-pokedex-gray hover:border-pokedex-screen hover:shadow-[2px_2px_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 group"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded border-2 border-pokedex-gray group-hover:border-pokedex-screen bg-pokedex-dark transition-colors">
                  <Icon className="h-5 w-5 text-pokedex-gray group-hover:text-pokedex-screen transition-colors" />
                </div>
                <span className="font-press-start text-[8px] text-pokedex-gray group-hover:text-pokedex-screen text-center tracking-wider transition-colors">
                  {action.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* System info */}
      <div className="bg-pokedex-screen-dark rounded-xl border-4 border-black shadow-[4px_4px_0_#000] p-5 relative overflow-hidden scanlines">
        <p className="font-press-start text-[9px] text-pokedex-screen opacity-60 mb-2 tracking-widest">SYSTEM LOG:</p>
        <p className="font-vt323 text-pokedex-screen text-xl leading-relaxed">
          Admin panel active. Manage your portfolio content from this panel.<br />
          Use the sidebar to navigate between sections.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-2 h-2 rounded-full bg-pokedex-screen blink" />
          <span className="font-press-start text-[8px] text-pokedex-screen opacity-70 tracking-widest">SYSTEM READY</span>
        </div>
      </div>
    </div>
  )
}