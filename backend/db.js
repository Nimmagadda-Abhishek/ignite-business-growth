import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: 'Z',
  ssl: {
    rejectUnauthorized: false
  },
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

export const pool = mysql.createPool(dbConfig);

// Connection management
pool.on('connection', (connection) => {
  console.log('New database connection established');
});

pool.on('error', (err) => {
  console.error('Database pool error:', err);
});

// Utility function to test connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection test successful');
    
    const [result] = await connection.query('SELECT VERSION() as version');
    console.log('MySQL Version:', result[0].version);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error.message);
    return false;
  }
};

// Connection retry mechanism
const initializeDatabase = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    const isConnected = await testConnection();
    if (isConnected) {
      return pool;
    }
    console.log(`Connection attempt ${i + 1} failed. Retrying in ${delay/1000} seconds...`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  throw new Error('Failed to establish database connection after multiple attempts');
};

// Execute initialization
initializeDatabase()
  .then(() => console.log('Database initialization complete'))
  .catch(err => {
    console.error('Database initialization failed:', err.message);
    process.exit(1);
  });

export default pool;