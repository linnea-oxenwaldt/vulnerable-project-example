const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

// GET /files/read?name=notes.txt
router.get('/read', (req, res) => {
  const name = req.query.name

  // Vulnerable: path traversal via user-controlled path segment
  const targetPath = path.join(__dirname, '..', '..', 'data', name)

  fs.readFile(targetPath, 'utf8', (err, contents) => {
    if (err) return res.status(404).send('Not found')
    res.type('text').send(contents)
  })
})

module.exports = router
