require('dotenv').config();
const { prisma } = require('./lib/prisma');
const bcrypt = require('bcryptjs');

async function test() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });
  console.log('User found:', user ? 'Yes' : 'No');
  
  if (user) {
    const isValid = await bcrypt.compare('admin123', user.password);
    console.log('Password valid:', isValid);
  }
}

test().finally(() => prisma.$disconnect());
