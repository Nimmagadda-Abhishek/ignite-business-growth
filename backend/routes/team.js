import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all team members
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM team');
  res.json(rows);
});

// Get a single team member
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM team WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new team member
router.post('/', authenticateToken, async (req, res) => {
  const { name, role, image } = req.body;
  await db.query('INSERT INTO team (name, role, image) VALUES (?, ?, ?)', [name, role, image]);
  res.status(201).json({ message: 'Team member created' });
});

// Update a team member
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, role, image } = req.body;
  await db.query('UPDATE team SET name = ?, role = ?, image = ? WHERE id = ?', [name, role, image, req.params.id]);
  res.json({ message: 'Team member updated' });
});

// Delete a team member
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM team WHERE id = ?', [req.params.id]);
  res.json({ message: 'Team member deleted' });
});

export default router; 