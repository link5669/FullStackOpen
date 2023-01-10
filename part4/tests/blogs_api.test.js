const { response } = require('express')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('all notes have an id property', async () => {
  const response = await api.get('/api/blogs')
  for (let i = 0; i < response.body.length; i++) {
    expect(response.body[i].id).toBeDefined()
  }
})

test('POSTing a new note adds the new note', async () => {
  const firstResponse = await api.get('/api/blogs')
  const newNote = {
    title: 'New Note',
    author: 'New Author',
    url: 'http://newnote.com',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newNote)
  const secondResponse = await api.get('/api/blogs')
  expect(secondResponse.body).toHaveLength(firstResponse.body.length + 1)
})
