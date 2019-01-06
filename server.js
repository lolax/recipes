const express = require('express')
const server = express()
const cors = require('cors')
const db = require('./data/database.js')
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'alive' })
})

const get = tbl => {
    server.get(`/${tbl}`, (req, res) => {
        db(tbl)
            .then(items => res.status(200).json(items))
            .catch(err => res.status(500).json(err))
    })
}

server.get('/recipes/:id', (req, res) => {
    const { id } = req.params
    db('recipes')
        .where({ id })
        .then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(500).json(err))
})

const getById = tbl => {
    server.get(`/${tbl}/:id`, (req, res) => {
        const { id } = req.params
        db(`${tbl} as t`)
            .join('recipes as r', 'r.id', 't.recipe_id')
            .where('t.recipe_id', id)
            .then(items => res.status(200).json(items))
            .catch(err => res.status(500).json(err))
    })
}

const add = tbl => {
    server.post(`/${tbl}`, (req, res) => {
        db(tbl)
            .insert(req.body)
            .then(id => res.status(201).json(id))
            .catch(err => res.status(500).json(err))
    })
}

const update = tbl => {
    server.put(`/${tbl}/:id`, (req, res) => {
        const { id } = req.params
        db(tbl)
            .where({ id })
            .update(req.body)
            .then(count => count > 0 ? 
                res.status(200).json(count) :
                res.status(400).json({ message: 'Update failed :(' })
            )
            .catch(err => res.status(500).json(err))
    })
}

const remove = tbl => {
    server.delete(`/${tbl}/:id`, (req, res) => {
        const { id } = req.params
        db(tbl)
            .where({ id })
            .del()
            .then(count => count > 0 ? 
                res.status(200).json(count) :
                res.status(400).json({ message: 'Delete failed :(' })
            )
            .catch(err => res.status(500).json(err))
    })
}

get('recipes')
get('ingredients')
get('steps')
getById('ingredients')
getById('steps')
add('recipes')
add('ingredients')
add('steps')
update('recipes')
update('ingredients')
update('steps')
remove('recipes')
remove('ingredients')
remove('steps')

module.exports = server;
