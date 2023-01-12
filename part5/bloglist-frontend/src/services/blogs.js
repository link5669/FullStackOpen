import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async (token) => {
  const authKey = `bearer ${token}`
  const request = await axios
    .get(baseUrl, { 
      headers: { Authorization: authKey } 
    })
  return request.data
}

const addLike = async (token, newObject) => {
  const authKey = `bearer ${token}`
  const request =  await axios
    .put(`${baseUrl}/${newObject.id}`, newObject, { 
      headers: { Authorization: authKey }
  })
  return request.data
}

const create = async (newBlog, token) => {
  const authKey = `bearer ${token}`
  const request = await axios
    .post(baseUrl, newBlog, { 
      headers: { Authorization: authKey } 
    })
}

export default { getAll, create, addLike }
