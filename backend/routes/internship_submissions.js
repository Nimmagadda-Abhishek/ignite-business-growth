import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads', 'resumes');
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only PDF, DOC, DOCX files are allowed'));
  }
});

// Get all internship submissions
router.get('/', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM internship_submissions ORDER BY submitted_at DESC');
  res.json(rows);
});

// Get a single internship submission
router.get('/:id', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM internship_submissions WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
});

// Download resume
router.get('/:id/resume', authenticateToken, async (req, res) => {
  const [rows] = await db.query('SELECT resume_path FROM internship_submissions WHERE id = ?', [req.params.id]);
  const filePath = rows[0]?.resume_path;
  if (filePath && fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ message: 'Resume not found' });
  }
});

// Create a new internship submission (with file upload)
router.post('/', upload.single('resume'), async (req, res) => {
  const { name, email, phone, program, university, year_of_study, duration, skills, experience, cover_letter } = req.body;
  const resume_path = req.file ? req.file.path : null;
  await db.query(
    'INSERT INTO internship_submissions (name, email, phone, program, university, year_of_study, duration, resume_path, skills, experience, cover_letter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, email, phone, program, university, year_of_study, duration, resume_path, skills, experience, cover_letter]
  );
  res.status(201).json({ message: 'Internship application submitted' });
});

// Delete an internship submission
router.delete('/:id', authenticateToken, async (req, res) => {
  // Delete the file from disk
  const [rows] = await db.query('SELECT resume_path FROM internship_submissions WHERE id = ?', [req.params.id]);
  const filePath = rows[0]?.resume_path;
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  await db.query('DELETE FROM internship_submissions WHERE id = ?', [req.params.id]);
  res.json({ message: 'Internship submission deleted' });
});

export default router; 