import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all footer links
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM footer_links');
  res.json(rows);
});

// Get a single footer link
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM footer_links WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new footer link
router.post('/', authenticateToken, async (req, res) => {
  const { name, path, type } = req.body;
  await db.query('INSERT INTO footer_links (name, path, type) VALUES (?, ?, ?)', [name, path, type]);
  res.status(201).json({ message: 'Footer link created' });
});

// Update a footer link
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, path, type } = req.body;
  await db.query('UPDATE footer_links SET name = ?, path = ?, type = ? WHERE id = ?', [name, path, type, req.params.id]);
  res.json({ message: 'Footer link updated' });
});

// Delete a footer link
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM footer_links WHERE id = ?', [req.params.id]);
  res.json({ message: 'Footer link deleted' });
});

export default router; 