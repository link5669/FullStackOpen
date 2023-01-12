const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint!' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  // console.log(request)
  const token = getTokenFrom(request)
  request.token = token
  console.log(request.token)
  next()
}

const userExtractor = async (request, response, next) => {
  // if (request.originalUrl === '/api/login') {
  //   return next()
  // }
  const decodedToken = jwt.verify(request.token, 'shared_secret')
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  request.user = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  unknownEndpoint, errorHandler, tokenExtractor, userExtractor
}
