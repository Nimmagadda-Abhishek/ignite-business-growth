# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/3bfb808b-a151-4685-8344-29372130f4c7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3bfb808b-a151-4685-8344-29372130f4c7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3bfb808b-a151-4685-8344-29372130f4c7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# Ignite Business Growth

## 🚀 Production Deployment Guide (Hostinger/Node.js VPS)

### 1. Prerequisites
- Node.js 18+ and npm installed on your server (Hostinger VPS or Node.js plan)
- MySQL database (credentials ready)
- Your domain (optional, for CORS)

---

### 2. Backend Setup

1. **Clone/Upload the project to your server**
2. **Install dependencies:**
   ```sh
   npm install --production
   cd backend && npm install --production
   ```
3. **Create a `.env` file in `/backend` (see `.env.example`):**
   ```env
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   JWT_SECRET=your-super-secret-key
   PORT=3001
   ```
4. **Ensure the `/uploads` directory exists and is writable:**
   ```sh
   mkdir -p uploads/resumes
   chmod -R 755 uploads
   ```
5. **Start the backend:**
   ```sh
   cd backend
   npm start
   # or
   node app.js
   ```
6. **(Optional) Set up a process manager (PM2, systemd) for production reliability.**

---

### 3. Frontend Setup

1. **Build the frontend for production:**
   ```sh
   npm run build
   # or
   yarn build
   ```
2. **Deploy the `dist/` folder:**
   - For static hosting: Upload `dist/` to your Hostinger static site.
   - For Node.js hosting: Serve `dist/` with a static server (e.g., serve, Nginx, or Express static).

3. **API URLs:**
   - In production, set your API base URL to your backend server (e.g., `http://yourdomain.com/api`).
   - Update fetch calls if needed.

---

### 4. Database Setup
- Import your schema and data to the production MySQL database.
- Ensure all required tables exist (see `/backend` SQL examples).

---

### 5. File Uploads
- Uploaded files (resumes, etc.) are stored in `/uploads/resumes/` on your server.
- The backend serves `/uploads` as static files for download.
- Make sure this directory is not publicly listed (use proper permissions).

---

### 6. CORS & Security
- Set CORS in your backend to allow your frontend domain.
- Use strong JWT secrets and secure your `.env` file.
- (Optional) Use helmet, rate limiting, etc. for extra security.

---

### 7. Troubleshooting
- Check backend logs for errors (`npm start` output).
- Ensure all environment variables are set.
- Make sure the database is accessible from your server.
- For file upload issues, check permissions on `/uploads`.

---

### 8. Useful Commands
- **Install dependencies:** `npm install --production`
- **Build frontend:** `npm run build`
- **Start backend:** `npm start` or `node backend/app.js`

---

**For any issues, check logs and ensure all environment variables and permissions are correct.**
