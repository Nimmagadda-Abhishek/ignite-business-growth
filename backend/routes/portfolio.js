import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all portfolio items
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM portfolio');
  res.json(rows);
});

// Get a single portfolio item
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM portfolio WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new portfolio item
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, image_url } = req.body;
  await db.query('INSERT INTO portfolio (title, description, image_url) VALUES (?, ?, ?)', [title, description, image_url]);
  res.status(201).json({ message: 'Portfolio item created' });
});

// Update a portfolio item
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, description, image_url } = req.body;
  await db.query('UPDATE portfolio SET title = ?, description = ?, image_url = ? WHERE id = ?', [title, description, image_url, req.params.id]);
  res.json({ message: 'Portfolio item updated' });
});

// Delete a portfolio item
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM portfolio WHERE id = ?', [req.params.id]);
  res.json({ message: 'Portfolio item deleted' });
});

export default router; 