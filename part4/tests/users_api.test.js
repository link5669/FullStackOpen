const supertest = require('supertest')
const app = require('../app')

const authKey = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pYSIsImlkIjoiNjNiZjdkOWFhZGJlNjBmNjZlZGUzNzE4IiwiaWF0IjoxNjczNDkzOTI1fQ.2oanos9197ZQIohFIA_GeLOHS2rwx9PjAvr8_1-mQ_0'

const api = supertest(app)

test('adding user', async () => {
  const newUser = {
    username: 'newuser',
    password: 'newpassword'
  }
  await api
    .post('/api/users')
    .set('Authorization', authKey)
    .send(newUser)
    .expect(201)
})

test('adding user with invalid username', async () => {
  const newUser = {
    username: 'ne',
    password: 'newpassword'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .set('Authorization', authKey)
    .expect(400)
})

test('adding user with invalid password', async () => {
  const newUser = {
    username: 'newuser',
    password: 'ne'
  }
  await api
    .post('/api/users')
    .send(newUser)
    .set('Authorization', authKey)
    .expect(400)
})
