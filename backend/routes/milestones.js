import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all milestones
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM milestones');
  res.json(rows);
});

// Get a single milestone
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM milestones WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new milestone
router.post('/', authenticateToken, async (req, res) => {
  const { year, title, description } = req.body;
  await db.query('INSERT INTO milestones (year, title, description) VALUES (?, ?, ?)', [year, title, description]);
  res.status(201).json({ message: 'Milestone created' });
});

// Update a milestone
router.put('/:id', authenticateToken, async (req, res) => {
  const { year, title, description } = req.body;
  await db.query('UPDATE milestones SET year = ?, title = ?, description = ? WHERE id = ?', [year, title, description, req.params.id]);
  res.json({ message: 'Milestone updated' });
});

// Delete a milestone
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM milestones WHERE id = ?', [req.params.id]);
  res.json({ message: 'Milestone deleted' });
});

export default router; 