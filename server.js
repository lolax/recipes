const express = require('express')
const server = express()
const cors = require('cors')
const db = require('./data/database.js')
server.use(cors())
server.use(express.json())

const admin = require("firebase-admin")
const serviceAccount = {
    "type": "service_account",
    "project_id": "lola-recipes",
    "private_key_id": process.env.private_key_id.trim(),
    "private_key": process.env.private_key.trim().replace(/\\n/g, '\n'),
    "client_email": process.env.client_email.trim(),
    "client_id": process.env.client_id.trim(),
    "auth_uri": process.env.auth_uri.trim(),
    "token_uri": process.env.token_uri.trim(),
    "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url.trim(),
    "client_x509_cert_url": process.env.client_x509_cert_url.trim()
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lola-recipes.firebaseio.com"
});

const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        admin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                const uid = decodedToken.uid;
                req.uid = uid
                next()
            })
            .catch((error) => {
                res.status(401).json({ message: 'invalid token' })
            });
    } else {
        res.status(401).json({ message: 'no token' })
    }
}

server.use(restricted)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'alive' })
})

server.get('/recipes', (req, res) => {
    const { uid } = req
    db('recipes')
        .where({ uid })
        .then(recipes => res.status(200).json(recipes))
        .catch(err => res.status(500).json(err))
})

server.get('/recipes/:id', (req, res) => {
    const { uid } = req
    const { id } = req.params
    db('recipes')
        .where({ uid, id })
        .then(recipe => res.status(200).json(recipe))
        .catch(err => res.status(500).json(err))
})

server.post('/recipes', (req, res) => {
    const { uid } = req
    const { dish, description, time } = req.body
    const newRecipe = { dish, description, time, uid }
    if (dish && description && time && uid) {
        db('recipes')
            .returning('id')
            .insert(newRecipe)
            .then(id => res.status(201).json(id))
            .catch(err => res.status(500).json(err))
    } else {
        res.status(422).json({ message: 'Please enter all fields.'})
    }
})

server.put('/recipes/:id', (req, res) => {
    const { uid } = req
    const { id } = req.params
    const { dish, description, time } = req.body
    const updatedRecipe = { dish, description, time, uid }
    if (dish && description && time && uid) {
        db('recipes')
            .where({ uid, id })
            .returning('id')
            .update(updatedRecipe)
            .then(id => res.status(201).json(id))
            .catch(err => res.status(500).json(err))
    } else {
        res.status(422).json({ message: 'Please enter all fields.'})
    }
    
})

server.delete('/recipes/:id', (req, res) => {
    const { uid } = req
    const { id } = req.params
    if (uid && id) {
        db('recipes')
        .where({ uid, id })
        .del()
        .then(count => count > 0 ? 
            res.status(200).json(count) :
            res.status(400).json({ message: 'Delete failed :(' })
        )
        .catch(err => res.status(500).json(err))
    }
})

const get = tbl => {
    server.get(`/${tbl}`, (req, res) => {
        db(tbl)
            .then(items => res.status(200).json(items))
            .catch(err => res.status(500).json(err))
    })
}

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
            .returning('id')
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
            .returning('id')
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

get('ingredients')
get('steps')
getById('ingredients')
getById('steps')
add('ingredients')
add('steps')
update('ingredients')
update('steps')
remove('ingredients')
remove('steps')

module.exports = server;
