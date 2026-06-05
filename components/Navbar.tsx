'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Hide navbar on admin pages — admin has its own sidebar layout
  if (pathname.startsWith('/admin')) return null

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CONTACT', href: '#contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-pokedex-red border-b-4 border-pokedex-red-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo / brand - left decorations */}
          <div className="flex items-center gap-3">
            {/* Big blue lens circle */}
            <div className="w-10 h-10 rounded-full bg-pokedex-blue border-4 border-white shadow-[0_0_0_2px_#1a1a1a] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white opacity-60" />
            </div>
            {/* Small indicator dots */}
            <div className="flex gap-1.5 items-center">
              <div className="w-3.5 h-3.5 rounded-full bg-red-300 border-2 border-pokedex-black shadow-[2px_2px_0_#000]" />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-300 border-2 border-pokedex-black shadow-[2px_2px_0_#000]" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-300 border-2 border-pokedex-black shadow-[2px_2px_0_#000]" />
            </div>
            <span className="font-press-start text-white text-xs tracking-widest ml-2 hidden sm:block">
              POKÉDEX
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="retro-btn bg-pokedex-red-dark text-white px-3 py-1.5 text-sm hover:bg-pokedex-red-light"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="retro-btn bg-pokedex-red-dark text-white p-2"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t-4 border-pokedex-red-dark bg-pokedex-black">
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="retro-btn bg-pokedex-red-dark text-white px-4 py-2 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar