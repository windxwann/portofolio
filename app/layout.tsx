import type { Metadata } from 'next'
import { VT323, Press_Start_2P } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const vt323 = VT323({ weight: '400', subsets: ['latin'], variable: '--font-vt323' })
const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'], variable: '--font-press-start' })

export const metadata: Metadata = {
  title: 'Pokédex Portfolio',
  description: 'My personal portfolio — Trainer Card Edition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${vt323.variable} ${pressStart.variable} font-vt323 bg-pokedex-black`}>
        {/* Navbar hides itself on /admin routes */}
        <Navbar />
        {children}
      </body>
    </html>
  )
}