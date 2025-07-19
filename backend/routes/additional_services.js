import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all additional services
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM additional_services');
  res.json(rows);
});

// Get a single additional service
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM additional_services WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new additional service
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  await db.query('INSERT INTO additional_services (title, description) VALUES (?, ?)', [title, description]);
  res.status(201).json({ message: 'Additional service created' });
});

// Update an additional service
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  await db.query('UPDATE additional_services SET title = ?, description = ? WHERE id = ?', [title, description, req.params.id]);
  res.json({ message: 'Additional service updated' });
});

// Delete an additional service
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM additional_services WHERE id = ?', [req.params.id]);
  res.json({ message: 'Additional service deleted' });
});

export default router; 