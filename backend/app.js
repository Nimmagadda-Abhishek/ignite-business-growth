import express from 'express';
import cors from 'cors';

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
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

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
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
}); 