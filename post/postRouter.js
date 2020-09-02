const express = require('express')

const posts = require('../data/db')

const router = express.Router()

router.get('/', (req, res) => {
    posts.find(req.query)
    .then(posts => res.status(200).json(posts))
})

module.exports = router