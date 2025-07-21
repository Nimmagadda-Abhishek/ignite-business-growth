import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all social links (public)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM social_links');
  res.json(rows);
});

// Get a single social link
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM social_links WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new social link
router.post('/', authenticateToken, async (req, res) => {
  const { name, url } = req.body;
  await db.query('INSERT INTO social_links (name, url) VALUES (?, ?)', [name, url]);
  res.status(201).json({ message: 'Social link created' });
});

// Update a social link
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, url } = req.body;
  await db.query('UPDATE social_links SET name = ?, url = ? WHERE id = ?', [name, url, req.params.id]);
  res.json({ message: 'Social link updated' });
});

// Delete a social link
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM social_links WHERE id = ?', [req.params.id]);
  res.json({ message: 'Social link deleted' });
});

export default router; 