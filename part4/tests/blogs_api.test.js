const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const authKey = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pYSIsImlkIjoiNjNiZjdkOWFhZGJlNjBmNjZlZGUzNzE4IiwiaWF0IjoxNjczNDkzOTI1fQ.2oanos9197ZQIohFIA_GeLOHS2rwx9PjAvr8_1-mQ_0'

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization', authKey)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  expect(response.body).toHaveLength(response.body.length)
})

test('all notes have an id property', async () => {
  const response = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  for (let i = 0; i < response.body.length; i++) {
    expect(response.body[i].id).toBeDefined()
  }
})

test('POSTing a new note adds the new note', async () => {
  const firstResponse = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  const newNote = {
    title: 'New Note',
    author: 'New Author',
    url: 'http://newnote.com',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newNote)
    .set('Authorization', authKey)
  const secondResponse = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  expect(secondResponse.body).toHaveLength(firstResponse.body.length + 1)
})

test('see if likes defaults to 0 if not included', async () => {
  const newNote = {
    title: 'New Note',
    author: 'New Authjor',
    url: 'http://newnote.com'
  }
  await api
    .post('/api/blogs')
    .send(newNote)
    .set('Authorization', authKey)
  const response = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  expect(response.body[response.body.length - 1].likes).toEqual(0)
})

test('see if sending invalid data results in proper status code', async () => {
  const newNote = {
    author: 'New Author'
  }
  await api
    .post('/api/blogs')
    .send(newNote)
    .set('Authorization', authKey)
    .expect(400)
})

test('see if deleting a note works', async () => {
  const firstResponse = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  const id = firstResponse.body[0].id
  await api
    .delete(`/api/blogs/${id}`)
    .set('Authorization', authKey)
    .expect(204)
  const secondResponse = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  expect(secondResponse.body).toHaveLength(firstResponse.body.length - 1)
})

test('see if updating a note works', async () => {
  const firstResponse = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  const id = firstResponse.body[0].id
  const updatedNote = {
    title: 'Updated Note',
    author: 'Updated author',
    url: 'http://updatednote.com',
    likes: 0,
    id: id
  }
  await api
    .put(`/api/blogs/${id}`)
    .set('Authorization', authKey)
    .send(updatedNote)
    .expect(200)
  const secondResponse = await api
    .get('/api/blogs')
    .set('Authorization', authKey)
  expect(secondResponse.body[0].title).toEqual('Updated Note')
})
