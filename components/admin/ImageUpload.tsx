'use client'

import { useState, useRef } from 'react'

interface ImageUploadProps {
  onUpload: (base64: string) => void
  currentImage?: string
  label: string
}

export default function ImageUpload({ onUpload, currentImage, label }: ImageUploadProps) {
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      onUpload(reader.result as string)
      setLoading(false)
    }
    reader.onerror = () => {
      setLoading(false)
      alert('Failed to read file')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      <label className="block font-press-start text-[9px] text-pokedex-light mb-2 tracking-widest uppercase">
        {label}
      </label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="retro-btn bg-pokedex-black border-2 border-pokedex-gray text-pokedex-screen px-4 py-2 font-press-start text-[9px] hover:border-pokedex-screen transition-colors"
        >
          {loading ? 'PROCESSING...' : 'UPLOAD IMAGE'}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {currentImage && (
          <span className="font-vt323 text-pokedex-gray text-sm truncate max-w-[200px]">
            File selected
          </span>
        )}
      </div>
    </div>
  )
}
