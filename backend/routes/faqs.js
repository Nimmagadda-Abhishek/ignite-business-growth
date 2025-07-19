import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all FAQs
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM faqs');
  res.json(rows);
});

// Get a single FAQ
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM faqs WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new FAQ
router.post('/', authenticateToken, async (req, res) => {
  const { question, answer } = req.body;
  await db.query('INSERT INTO faqs (question, answer) VALUES (?, ?)', [question, answer]);
  res.status(201).json({ message: 'FAQ created' });
});

// Update a FAQ
router.put('/:id', authenticateToken, async (req, res) => {
  const { question, answer } = req.body;
  await db.query('UPDATE faqs SET question = ?, answer = ? WHERE id = ?', [question, answer, req.params.id]);
  res.json({ message: 'FAQ updated' });
});

// Delete a FAQ
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
  res.json({ message: 'FAQ deleted' });
});

export default router; 