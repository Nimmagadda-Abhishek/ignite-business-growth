import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all testimonials (public)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM testimonials');
  res.json(rows);
});

// Get a single testimonial
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM testimonials WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new testimonial
router.post('/', authenticateToken, async (req, res) => {
  const { name, content } = req.body;
  await db.query('INSERT INTO testimonials (name, content) VALUES (?, ?)', [name, content]);
  res.status(201).json({ message: 'Testimonial created' });
});

// Update a testimonial
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, content } = req.body;
  await db.query('UPDATE testimonials SET name = ?, content = ? WHERE id = ?', [name, content, req.params.id]);
  res.json({ message: 'Testimonial updated' });
});

// Delete a testimonial
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
  res.json({ message: 'Testimonial deleted' });
});

export default router; 