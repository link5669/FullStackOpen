const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
require('express-async-errors')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter, middleware.userExtractor)
app.use('/api/users', usersRouter, middleware.userExtractor)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
