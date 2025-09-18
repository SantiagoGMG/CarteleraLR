// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Registro
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ success:false, message:'Faltan campos' });

    const [exist] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (exist.length) return res.status(409).json({ success:false, message:'Email ya registrado' });

    const [result] = await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    return res.json({ success:true, userId: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Error del servidor' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success:false, message:'Faltan campos' });

    const [rows] = await pool.query('SELECT id, username, email FROM users WHERE email = ? AND password = ?', [email, password]);
    if (!rows.length) return res.status(401).json({ success:false, message:'Credenciales inválidas' });

    const user = rows[0];
    return res.json({ success:true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message:'Error del servidor' });
  }
});

// (Opcional) lista de usuarios para debug
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, created_at FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
