import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all services (public)
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM services');
  res.json(rows);
});

// Get a single service
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Create a new service
router.post('/', authenticateToken, async (req, res) => {
  const { service_id, title, description, features, technologies, pricing, delivery_time, image_url } = req.body;
  await db.query('INSERT INTO services (service_id, title, description, features, technologies, pricing, delivery_time, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [service_id, title, description, features, technologies, pricing, delivery_time, image_url]);
  res.status(201).json({ message: 'Service created' });
});

// Update a service
router.put('/:id', authenticateToken, async (req, res) => {
  const { service_id, title, description, features, technologies, pricing, delivery_time, image_url } = req.body;
  await db.query('UPDATE services SET service_id = ?, title = ?, description = ?, features = ?, technologies = ?, pricing = ?, delivery_time = ?, image_url = ? WHERE id = ?', [service_id, title, description, features, technologies, pricing, delivery_time, image_url, req.params.id]);
  res.json({ message: 'Service updated' });
});

// Delete a service
router.delete('/:id', authenticateToken, async (req, res) => {
  await db.query('DELETE FROM services WHERE id = ?', [req.params.id]);
  res.json({ message: 'Service deleted' });
});

export default router; 