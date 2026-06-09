import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst()
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const {
      id,
      name, title, bio, description, avatar,
      email, phone, location,
      github, linkedin, instagram,
    } = body

    // 1. Update Profile model
    const data = {
      name, title, bio,
      description: description ?? null,
      avatar: avatar ?? null,
      email,
      phone: phone ?? null,
      location: location ?? null,
      github: github ?? null,
      linkedin: linkedin ?? null,
      instagram: instagram ?? null,
    }

    const profile = await prisma.profile.upsert({
      where: { id: id || 1 },
      update: data,
      create: data,
    })

    // 2. Update User model (assuming admin is the user with email)
    // First, find the user to update
    const user = await prisma.user.findFirst({ where: { role: 'admin' } })
    if (user) {
        await prisma.user.update({
            where: { id: user.id },
            data: { email: email, name: name }
        })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}