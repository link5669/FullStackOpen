// var morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const { json } = require('express')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
// morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
// let logger = morgan(':method :url :status :res[content-length] :body - :response-time ms')
// app.use(logger)
// morgan(':method :url :url :url :status :res[content-length] - :response-time ms')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler)
const password = '56695669'
const url = `mongodb+srv://link5669:${password}@cluster0.xokpdrt.mongodb.net/myFirstDatabase`

mongoose.connect(url).catch((error) => console.log(error))

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: String
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const phonebookEntry = mongoose.model('PhonebookEntry', phonebookSchema)

async function findAll(response) {
  await phonebookEntry.find({}).then(result => {
    response.json(result)
  })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World! Persons at <a href="/api/persons">this</a> link</h1>')
  })

  app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br>${new Date()}`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    phonebookEntry.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    }).catch(error => next(error))
  })
  
  app.get('/api/persons', (request, response) => {
    phonebookEntry.find({}).then(result => {
      response.json(result)
    })
  })

  app.post('/api/persons', (request, response) => {
    if (!request.body.name || !request.body.number) {
        response.json("Must include name and number!")
        return
    }
    const newPerson = new phonebookEntry({
        name: request.body.name,
        number: request.body.number,
        id: Math.floor(Math.random() * 1000)
    })
    console.log(newPerson)
    return newPerson.save()
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebookEntry.findById(id).then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
  })
  
  const PORT =  process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })