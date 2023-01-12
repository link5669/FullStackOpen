const axios = require('axios')
const baseUrl = 'http://localhost:3003/api/login'

// const authKey = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pYSIsImlkIjoiNjNiZjdkOWFhZGJlNjBmNjZlZGUzNzE4IiwiaWF0IjoxNjczNDkzOTI1fQ.2oanos9197ZQIohFIA_GeLOHS2rwx9PjAvr8_1-mQ_0'

const login = async (username, password) => {
    const result = await axios
      .post(baseUrl, { username, password })
    return result.data
  }

  export default { login }
