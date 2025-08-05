import express from 'express';
import cors from 'cors';
import pool, { testConnection } from './db.js';

import servicesRouter from './routes/services.js';
import additionalServicesRouter from './routes/additional_services.js';
import adminUsersRouter from './routes/admin_users.js';
import companyValuesRouter from './routes/company_values.js';
import contactInfoRouter from './routes/contact_info.js';
import faqsRouter from './routes/faqs.js';
import footerLinksRouter from './routes/footer_links.js';
import milestonesRouter from './routes/milestones.js';
import socialLinksRouter from './routes/social_links.js';
import teamRouter from './routes/team.js';
import authRouter from './routes/auth.js';
import contactSubmissionsRouter from './routes/contact_submissions.js';
import quoteSubmissionsRouter from './routes/quote_submissions.js';
import internshipSubmissionsRouter from './routes/internship_submissions.js';
import testimonialsRouter from './routes/testimonials.js';
import portfolioRouter from './routes/portfolio.js';
import path from 'path';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://your-frontend-domain.com' // Add your frontend deployment URL here
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running', status: 'OK' });
});

// Enhanced health check endpoint
app.get('/health', async (req, res) => {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Database connection test failed');
    }

    const [serverInfo] = await pool.query('SELECT VERSION() as version');
    
    res.json({ 
      status: 'OK',
      database: {
        connected: true,
        version: serverInfo[0].version
      },
      api: {
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'ERROR',
      database: {
        connected: false,
        error: error.message
      },
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT 1');
    res.json({
      success: true,
      message: 'Database connection successful',
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

app.use('/api/services', servicesRouter);
app.use('/api/additional_services', additionalServicesRouter);
app.use('/api/admin_users', adminUsersRouter);
app.use('/api/company_values', companyValuesRouter);
app.use('/api/contact_info', contactInfoRouter);
app.use('/api/faqs', faqsRouter);
app.use('/api/footer_links', footerLinksRouter);
app.use('/api/milestones', milestonesRouter);
app.use('/api/social_links', socialLinksRouter);
app.use('/api/team', teamRouter);
app.use('/api/auth', authRouter);
app.use('/api/contact_submissions', contactSubmissionsRouter);
app.use('/api/quote_submissions', quoteSubmissionsRouter);
app.use('/api/internship_submissions', internshipSubmissionsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 3001;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});