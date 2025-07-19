import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all internships
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM internship');
  res.json(rows);
});

// Get a single internship
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM internship WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new internship
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  await db.query('INSERT INTO internship (title, description) VALUES (?, ?)', [title, description]);
  res.status(201).json({ message: 'Internship created' });
});

// Update an internship
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  await db.query('UPDATE internship SET title = ?, description = ? WHERE id = ?', [title, description, req.params.id]);
  res.json({ message: 'Internship updated' });
});

// Delete an internship
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM internship WHERE id = ?', [req.params.id]);
  res.json({ message: 'Internship deleted' });
});

export default router; 