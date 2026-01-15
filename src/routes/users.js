const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const router = express.Router()

const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)')
  db.run("INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie')")
})

// GET /users?name=Alice
router.get('/', (req, res) => {
  const name = req.query.name || ''

  // Use a parameterized query to avoid SQL injection
  const sql = 'SELECT id, name FROM users WHERE name = ?'

  db.all(sql, [name], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ rows })
  })
})

module.exports = router
