import { config } from 'dotenv';
config();
import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

async function reset() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('User password updated/created:', user.email);
}

reset().finally(() => prisma.$disconnect());
