const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.get('/test', (request, response) => {
  response.send('Hello World!')
})

blogsRouter.post('/', (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json('Title and URL are required')
  }
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  })
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedEntry = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    id: request.body.id
  }
  await Blog.findByIdAndUpdate(request.body.id, updatedEntry, { new: true })
  response.status(200).end()
})

module.exports = blogsRouter
