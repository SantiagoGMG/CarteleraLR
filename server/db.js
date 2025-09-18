// server/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'vueuser',
  password: process.env.DB_PASS || 'strongpassword',
  database: process.env.DB_NAME || 'vue_auth',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
