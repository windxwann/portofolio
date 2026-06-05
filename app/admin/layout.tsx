'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  Code,
  GraduationCap,
  Briefcase,
  FolderGit2,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/admin/profile', icon: User },
  { name: 'Skills', href: '/admin/skills', icon: Code },
  { name: 'Education', href: '/admin/education', icon: GraduationCap },
  { name: 'Experience', href: '/admin/experience', icon: Briefcase },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-pokedex-black font-vt323">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onLogout={handleLogout} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent onLogout={handleLogout} />
      </div>

      {/* Main content */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Mobile topbar */}
        <div className="sticky top-0 z-30 lg:hidden bg-pokedex-dark border-b-2 border-pokedex-red px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-pokedex-yellow hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-press-start text-pokedex-red text-xs tracking-widest">ADMIN PANEL</span>
          <div className="ml-auto w-2 h-2 rounded-full bg-pokedex-screen blink" />
        </div>

        {/* Page content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({
  onLogout,
  onClose,
}: {
  onLogout: () => void
  onClose?: () => void
}) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-pokedex-dark border-r-4 border-pokedex-black shadow-[4px_0_0_#000]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-pokedex-red border-b-4 border-pokedex-black">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pokedex-blue border-2 border-white shadow-[0_0_8px_rgba(0,85,164,0.6)] flex items-center justify-center shrink-0">
            <div className="w-3 h-3 rounded-full bg-white opacity-60" />
          </div>
          <div>
            <p className="font-press-start text-white text-[10px] tracking-widest leading-tight">ADMIN</p>
            <p className="font-press-start text-pokedex-yellow text-[8px] tracking-wider opacity-80">CONTROL CENTER</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white hover:text-pokedex-yellow transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Indicator lights */}
      <div className="flex items-center gap-2 px-4 py-2 bg-pokedex-red-dark border-b-4 border-pokedex-black">
        <div className="w-3 h-3 rounded-full bg-red-300 border border-black shadow-[1px_1px_0_#000]" />
        <div className="w-3 h-3 rounded-full bg-yellow-300 border border-black shadow-[1px_1px_0_#000]" />
        <div className="w-3 h-3 rounded-full bg-green-300 border border-black shadow-[1px_1px_0_#000] blink" />
        <span className="ml-auto font-vt323 text-pokedex-light text-sm opacity-60">SYS OK</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded transition-all duration-100 group border-2 ${
                isActive
                  ? 'bg-pokedex-screen-dark border-pokedex-screen text-pokedex-screen shadow-[2px_2px_0_#000]'
                  : 'border-transparent text-pokedex-light hover:border-pokedex-gray hover:bg-pokedex-black hover:shadow-[2px_2px_0_#000]'
              }`}
            >
              <span className={`font-press-start text-[8px] ${isActive ? 'text-pokedex-screen' : 'text-pokedex-gray group-hover:text-pokedex-yellow'}`}>
                {isActive ? '►' : '·'}
              </span>
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-pokedex-screen' : 'text-pokedex-gray group-hover:text-pokedex-yellow'}`} />
              <span className="font-vt323 text-lg tracking-wider uppercase">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer / logout */}
      <div className="p-3 border-t-4 border-pokedex-black">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded border-2 border-transparent text-pokedex-light hover:border-pokedex-red hover:bg-pokedex-red hover:text-white transition-all duration-100 hover:shadow-[2px_2px_0_#000] group"
        >
          <span className="font-press-start text-[8px] text-pokedex-gray group-hover:text-white">·</span>
          <LogOut className="h-4 w-4 shrink-0 text-pokedex-gray group-hover:text-white" />
          <span className="font-vt323 text-lg tracking-wider uppercase">Logout</span>
        </button>
        <p className="font-press-start text-[7px] text-pokedex-gray text-center mt-3 opacity-50 tracking-widest">
          POKÉDEX ADMIN v1.0
        </p>
      </div>
    </div>
  )
}