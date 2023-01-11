const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('adding user', async () => {
  const newUser = {
    username: 'newuser',
    password: 'newpassword'
  }
  await api
    .post('/api/users')
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
    .expect(400)
})
