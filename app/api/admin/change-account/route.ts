import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('admin-token')?.value

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const payload = await verifyToken(token)
        if (!payload) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
        }

        const { email, newPassword } = await request.json()
        
        // Find existing user
        const user = await prisma.user.findUnique({ where: { id: payload.id } })
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

        const updateData: any = { email }

        if (newPassword && newPassword.trim().length >= 6) {
            updateData.password = await hashPassword(newPassword.trim())
        } else if (newPassword) {
            return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
        }

        await prisma.user.update({
            where: { id: payload.id },
            data: updateData,
        })
        
        // Also update email in Profile table to keep sync
        await prisma.profile.updateMany({
            where: { id: 1 }, // Assuming one profile
            data: { email: email }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update account' }, { status: 500 })
    }
}
