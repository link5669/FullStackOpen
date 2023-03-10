const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', { username: 1 })
  response.json(result)
})

blogsRouter.get('/test', (request, response) => {
  response.send('Hello World!')
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json('Title and URL are required')
  }
  const user = request.user
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'user not authorized' })
  } else {
    await Blog.findByIdAndRemove(request.params.id)
  }
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedEntry = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.body.id,
    id: request.body.user
  }
  await Blog.findByIdAndUpdate(request.body.id, updatedEntry, { new: true })
  response.status(200).end()
})

module.exports = blogsRouter
