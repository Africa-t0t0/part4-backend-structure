const express = require('express')
const cors = require('cors')
require('express-async-errors');
const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blogs')

const app = express()


app.use(cors())
app.use(middleware.requestLogger)
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;