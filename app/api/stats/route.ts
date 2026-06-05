import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Projects Count
    const projectCount = await prisma.project.count();

    // 2. Experience Years
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: 'asc' },
    });

    let expYears = 0;
    if (experiences.length > 0) {
      const earliestStart = new Date(experiences[0].startDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - earliestStart.getTime());
      expYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    }

    // 3. Unique Clients (Companies)
    const uniqueCompanies = await prisma.experience.groupBy({
      by: ['company'],
    });
    const clientsCount = uniqueCompanies.length;

    return NextResponse.json({
      projects: `${projectCount}+`,
      coffee: "∞", // Still static, as requested in context
      expYears: `${expYears > 0 ? expYears : 1}+`,
      clients: `${clientsCount}+`,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
