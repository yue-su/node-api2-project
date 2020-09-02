const express = require("express")

const postRouter = require('./post/postRouter')

const server = express()

server.use(express.json())
server.use('/api/posts', postRouter)

server.get('/', (req, res) => {
    res.send(`
    <h3>Blog</h3>
    `)
})

server.listen(4000, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n")
})