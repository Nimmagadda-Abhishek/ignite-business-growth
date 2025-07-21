import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all contact info (public)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact_info');
  res.json(rows);
});

// Get a single contact info
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM contact_info WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new contact info
router.post('/', authenticateToken, async (req, res) => {
  const { type, title, value, description, action } = req.body;
  await db.query('INSERT INTO contact_info (type, title, value, description, action) VALUES (?, ?, ?, ?, ?)', [type, title, value, description, action]);
  res.status(201).json({ message: 'Contact info created' });
});

// Update a contact info
router.put('/:id', authenticateToken, async (req, res) => {
  const { type, title, value, description, action } = req.body;
  await db.query('UPDATE contact_info SET type = ?, title = ?, value = ?, description = ?, action = ? WHERE id = ?', [type, title, value, description, action, req.params.id]);
  res.json({ message: 'Contact info updated' });
});

// Delete a contact info
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM contact_info WHERE id = ?', [req.params.id]);
  res.json({ message: 'Contact info deleted' });
});

export default router; 