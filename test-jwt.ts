import { generateToken, verifyToken } from './lib/auth';

const payload = {
  id: 1,
  email: 'admin@example.com',
  name: 'Admin',
  role: 'admin'
};

async function test() {
  const token = await generateToken(payload);
  console.log('Token generated');
  const verified = await verifyToken(token);
  console.log('Token verified:', verified ? 'Yes' : 'No');
  if (verified) {
      console.log('Payload matches:', verified.email === payload.email);
  }
}

test();
