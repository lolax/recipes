const express = require('express')
const server = express()
const cors = require('cors')
server.use(cors({ origin: 'http://localhost:8080', credentials: true }))
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'alive' })
})

server.get('/recipes', (req, res) => {
    res.status(200).json({ msg: "ok" })
})

server.get('/recipes/:id', (req, res) => {
    res.status(200).json({ msg: "ok" })
})

server.post('/recipes', (req, res) => {
    res.status(200).json({ msg: "ok" })
})

server.put('/recipes/:id', (req, res) => {
    res.status(200).json({ msg: "ok" })
})

server.delete('/recipes/:id', (req, res) => {
    res.status(200).json({ msg: "ok" })
})

module.exports = server;
