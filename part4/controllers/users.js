const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users.map(user => {
    const obj = user.toJSON()
    delete obj.passwordHash
    return obj
  }))
})

usersRouter.post('/', async (request, response) => {
  if (!request.body.username || !request.body.password) {
    return response.status(400).json('Username and password are required')
  } else if (request.body.password.length < 3 || request.body.username.length < 3) {
    return response.status(400).json('Username and password must be at least 3 characters long')
  }
  const { username, password } = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    passwordHash
  })
  const savedUser = await user.save()
  response.status(201).send(savedUser)
})

module.exports = usersRouter
