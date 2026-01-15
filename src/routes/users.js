const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const RateLimit = require('express-rate-limit')

const router = express.Router()

const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)')
  db.run("INSERT INTO users (name) VALUES ('Alice'), ('Bob'), ('Charlie')")
})

const usersLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})

// GET /users?name=Alice
router.get('/', usersLimiter, (req, res) => {
  const name = req.query.name || ''

  // Vulnerable: string concatenation into SQL query
  const sql = `SELECT id, name FROM users WHERE name = '${name}'`

  db.all(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ rows })
  })
})

module.exports = router
