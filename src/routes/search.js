const express = require('express')

const router = express.Router()

// GET /search?q=<img src=x onerror=alert(1)>
router.get('/', (req, res) => {
  const q = req.query.q || ''

  // Vulnerable: reflected HTML without output encoding
  res.type('html').send(`
    <h1>Search</h1>
    <p>You searched for: ${q}</p>
  `)
})

module.exports = router
