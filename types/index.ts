export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  description?: string
  avatar?: string
  email: string
  phone?: string
  location?: string
  github?: string | null
  linkedin?: string | null
  instagram?: string | null
}

export interface Skill {
  id: number
  name: string
  category: string
  level: number
  icon?: string
}

export interface Education {
  id: number
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  current: boolean
  description?: string
}

export interface Project {
  id: number
  title: string
  description: string
  image?: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: Date
}

export interface Experience {
  id: number
  company: string
  position: string
  location?: string
  startDate: Date
  endDate?: Date
  current: boolean
  description?: string
}