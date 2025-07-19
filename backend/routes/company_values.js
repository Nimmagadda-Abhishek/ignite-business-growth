import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all company values
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM company_values');
  res.json(rows);
});

// Get a single company value
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM company_values WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new company value
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  await db.query('INSERT INTO company_values (title, description) VALUES (?, ?)', [title, description]);
  res.status(201).json({ message: 'Company value created' });
});

// Update a company value
router.put('/:id', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  await db.query('UPDATE company_values SET title = ?, description = ? WHERE id = ?', [title, description, req.params.id]);
  res.json({ message: 'Company value updated' });
});

// Delete a company value
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM company_values WHERE id = ?', [req.params.id]);
  res.json({ message: 'Company value deleted' });
});

export default router; 