import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all quote submissions
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM quote_submissions ORDER BY submitted_at DESC');
  res.json(rows);
});

// Get a single quote submission
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM quote_submissions WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new quote submission
router.post('/', async (req, res) => {
  const { name, email, phone, company, service, budget, message } = req.body;
  await db.query('INSERT INTO quote_submissions (name, email, phone, company, service, budget, message) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, phone, company, service, budget, message]);
  res.status(201).json({ message: 'Quote submission created' });
});

// Delete a quote submission
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM quote_submissions WHERE id = ?', [req.params.id]);
  res.json({ message: 'Quote submission deleted' });
});

export default router; 