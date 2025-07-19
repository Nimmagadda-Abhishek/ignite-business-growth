import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Hardcoded admin user (replace with DB lookup in production)
const adminUser = {
  username: 'admin',
  // password: 'yBeh6s2iTsI=' (hashed)
  passwordHash: '$2b$10$ghTVwVQTn/AF4T.cEIgGiekKgwEusNQwOUb7k4rpBy.khGYclELPy',
};

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

console.log('Hash in use:', adminUser.passwordHash);
console.log('Test bcrypt compare:', bcrypt.compareSync('yBeh6s2iTsI=', adminUser.passwordHash));

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });
  if (username !== adminUser.username) {
    console.log('Invalid username');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const valid = await bcrypt.compare(password, adminUser.passwordHash);
  console.log('Bcrypt compare result:', valid);
  if (!valid) {
    console.log('Invalid password');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router; 