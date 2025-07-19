import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all contact submissions
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact_submissions ORDER BY submitted_at DESC');
  res.json(rows);
});

// Get a single contact submission
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact_submissions WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new contact submission
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;
  await db.query('INSERT INTO contact_submissions (name, email, phone, message) VALUES (?, ?, ?, ?)', [name, email, phone, message]);
  res.status(201).json({ message: 'Contact submission created' });
});

// Delete a contact submission
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM contact_submissions WHERE id = ?', [req.params.id]);
  res.json({ message: 'Contact submission deleted' });
});

export default router; 