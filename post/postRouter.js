const express = require('express')

const posts = require('../data/db')

const router = express.Router()

/*-----GET-----*/

router.get('/', (req, res) => {
    posts.find(req.query)
        .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({message: 'Error retrieving the posts'}))
})

router.get('/:id', (req, res) => {
    posts.findById(req.params.id)
        .then(post => {
            if (post) { res.status(200).json(post) }
            else{res.status(404).json({message: 'post not found'})}
    }).catch(err => res.status(500).json({message: 'Error retrieving the posts'}))
})

router.get('/:id/comments', (req, res) => {
    posts.findPostComments(req.params.id)
        .then(comments => {
            if (comments) { res.status(200).json(comments) }
            else{res.status(404).json({message: 'post/comments not found'})}
    }).catch(err => res.status(500).json({message: 'Error retrieving the comments'}))
})

/*-----POST-----*/

router.post('/', (req, res) => {
    posts
      .insert(req.body)
      .then((post) => {
        if (req.body.title && req.body.contents) {
          res.status(201).json(post)
        } else {
          res
            .status(400)
            .json({
              errorMessage: "Please provide title and contents for the post.",
            })
        }
      })
      .catch((err) =>
        res
          .status(500)
          .json({ error: "There was an error while saving the post to the database" })
      )
})

router.post('/:id/comments', (req, res) => {
    posts.insertComment(req.body)
    .then((comment) => {
      if (req.params.id) {
        if (req.body.text) {
          res.status(201).json(comment)
        } else {
          res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." })
        }
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      }
    })
        .catch((err) =>
      res
        .status(500)
        .json({
          error: "There was an error while saving the comment to the database",
        })
    )
})

/*-----PUT-----*/
router.put('/:id', (req, res) => {
    posts.update(req.body)
        .then(post => {
            if (req.params.id) {
                if (req.body.title && req.body.contents) {
                    res.status(200).json(post)
                }else {res.status(400).json({ errorMessage: "Please provide title and contents for the post." }.)}
        }else {res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })}
        })
    .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
})

/*-----DELETE-----*/
router.delete('/:id', (req, res) => {
    posts.remove(req.params.id)
        .then(post => {
            if (req.params.id) {
            res.status(200).json(post)
        }else {res.status(404).json({ message: "The post with the specified ID does not exist." })}
        })
    .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

module.exports = router