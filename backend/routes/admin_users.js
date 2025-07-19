import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const router = express.Router();

// Get all admin users
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT id, username FROM admin_users');
  res.json(rows);
});

// Get a single admin user
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT id, username FROM admin_users WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new admin user
router.post('/', authenticateToken, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)', [username, hash]);
  res.status(201).json({ message: 'Admin user created' });
});

// Update an admin user
router.put('/:id', authenticateToken, async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (password) {
    const hash = await bcrypt.hash(password, 10);
    await db.query('UPDATE admin_users SET username = ?, password_hash = ? WHERE id = ?', [username, hash, req.params.id]);
  } else {
    await db.query('UPDATE admin_users SET username = ? WHERE id = ?', [username, req.params.id]);
  }
  res.json({ message: 'Admin user updated' });
});

// Delete an admin user
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM admin_users WHERE id = ?', [req.params.id]);
  res.json({ message: 'Admin user deleted' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Make username comparison case-insensitive
  const [rows] = await db.query('SELECT * FROM admin_users WHERE LOWER(username) = ?', [username.toLowerCase()]);
  if (!rows.length) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router; 