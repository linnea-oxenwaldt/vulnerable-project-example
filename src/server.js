const express = require('express')
const reports = require('./routes/reports')
const files = require('./routes/files')
const search = require('./routes/search')
const users = require('./routes/users')

const app = express()

app.use(express.json())

app.use('/reports', reports)
app.use('/files', files)
app.use('/search', search)
app.use('/users', users)

app.get('/', (req, res) => {
  res.send('vuln-lab running')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
