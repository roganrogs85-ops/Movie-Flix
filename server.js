const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;
const demoUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'movieflix' }
];

app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'moviesdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.htm'));
});

function isDemoUser(username, password) {
  return demoUsers.some((user) => user.username === username && user.password === password);
}

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username or password' });
  }

  if (isDemoUser(username, password)) {
    return res.json({ success: true, username, source: 'demo' });
  }

  pool.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error(err);
        if (isDemoUser(username, password)) {
          return res.json({ success: true, username, source: 'demo' });
        }
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
      if (results.length === 0) {
        if (isDemoUser(username, password)) {
          return res.json({ success: true, username, source: 'demo' });
        }
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
      res.json({ success: true, username });
    }
  );
});

app.get('/api/movies', (req, res) => {
  pool.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading movie data');
    }
    res.json(results);
  });
});

app.get('/api/horror', (req, res) => {
  pool.query('SELECT * FROM movies WHERE genre = ?', ['Horror'], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading movie data');
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
