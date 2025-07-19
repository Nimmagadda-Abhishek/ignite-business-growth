import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all about entries
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM about');
  res.json(rows);
});

// Get a single about entry
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM about WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new about entry
router.post('/', authenticateToken, async (req, res) => {
  const { content } = req.body;
  await db.query('INSERT INTO about (content) VALUES (?)', [content]);
  res.status(201).json({ message: 'About entry created' });
});

// Update an about entry
router.put('/:id', authenticateToken, async (req, res) => {
  const { content } = req.body;
  await db.query('UPDATE about SET content = ? WHERE id = ?', [content, req.params.id]);
  res.json({ message: 'About entry updated' });
});

// Delete an about entry
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM about WHERE id = ?', [req.params.id]);
  res.json({ message: 'About entry deleted' });
});

export default router; 