'use client'

import { useEffect, useState } from 'react'
import { Users, FolderGit2, Code, GraduationCap, Briefcase } from 'lucide-react'

interface Stats {
  projects: number
  skills: number
  education: number
  experience: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    skills: 0,
    education: 0,
    experience: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [projects, skills, education, experience] = await Promise.all([
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/skills').then(res => res.json()),
        fetch('/api/education').then(res => res.json()),
        fetch('/api/experiences').then(res => res.json()),
      ])

      setStats({
        projects: projects.length,
        skills: skills.length,
        education: education.length,
        experience: experience.length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: FolderGit2, color: 'bg-blue-500' },
    { title: 'Total Skills', value: stats.skills, icon: Code, color: 'bg-green-500' },
    { title: 'Education', value: stats.education, icon: GraduationCap, color: 'bg-purple-500' },
    { title: 'Experience', value: stats.experience, icon: Briefcase, color: 'bg-orange-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/admin/projects/new"
            className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <FolderGit2 className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Add Project</span>
          </a>
          <a
            href="/admin/skills/new"
            className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <Code className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Add Skill</span>
          </a>
          <a
            href="/admin/education/new"
            className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
          >
            <GraduationCap className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Add Education</span>
          </a>
          <a
            href="/admin/experience/new"
            className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors"
          >
            <Briefcase className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Add Experience</span>
          </a>
        </div>
      </div>
    </div>
  )
}