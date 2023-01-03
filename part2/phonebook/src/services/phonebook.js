import axios from 'axios'
const baseUrl = 'http://localhost:3001/db'
const dataUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(dataUrl, newObject)
  return request.then(response => response.data)
}

const update = (newObject) => {
  const request = axios.put(`${dataUrl}/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

const deleteObj = (toDelete) => {
  const request = axios.delete(`${dataUrl}/${toDelete.id}`) 
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteObj }