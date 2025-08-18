const express = require('express')
const cors = require('cors')

const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const app = express()


app.use(cors())
app.use(middleware.requestLogger)
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;