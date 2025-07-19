import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all contact messages (with pagination)
router.get('/', authenticateToken, async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const [rows] = await db.query('SELECT * FROM contact LIMIT ? OFFSET ?', [limit, offset]);
  const [[{ count }]] = await db.query('SELECT COUNT(*) as count FROM contact');
  res.json({ data: rows, total: count });
});

// Get a single contact message
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new contact message
router.post('/', authenticateToken, async (req, res) => {
  const { name, email, message } = req.body;
  await db.query('INSERT INTO contact (name, email, message) VALUES (?, ?, ?)', [name, email, message]);
  res.status(201).json({ message: 'Contact message created' });
});

// Update a contact message
router.put('/:id', async (req, res) => {
  const { name, email, message } = req.body;
  await db.query('UPDATE contact SET name = ?, email = ?, message = ? WHERE id = ?', [name, email, message, req.params.id]);
  res.json({ message: 'Contact message updated' });
});

// Delete a contact message
router.delete('/:id', async (req, res) => {
  await db.query('DELETE FROM contact WHERE id = ?', [req.params.id]);
  res.json({ message: 'Contact message deleted' });
});

export default router; 