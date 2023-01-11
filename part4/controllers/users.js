const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
  response.json(users.map(user => {
    const obj = user.toJSON()
    delete obj.passwordHash
    return obj
  }))
})

usersRouter.post('/', async (request, response) => {
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
