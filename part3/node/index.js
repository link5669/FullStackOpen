const mongoose = require('mongoose')
const express = require('express')
const app = express()
app.use(express.static('build'))
app.use(express.json())
const cors = require('cors')
const { json } = require('express')
app.use(cors())

const password = '56695669'
const url = `mongodb+srv://link5669:${password}@cluster0.xokpdrt.mongodb.net/myFirstDatabase`

mongoose.connect(url).catch((error) => console.log(error))

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        let numDash = 0
        for (let i = 0; i < v.length; i++) {
          if (v.charAt(i) == '-') {
            if (i == 2 || i == 3) {
              numDash += 1
            } else {
              return false
            }
          } else if (numDash == 0 || numDash == 1) {
            if (v.charAt(i).isNAN) {
              return false
            }
          } else {
            return false;
          }
        }
        return true
      }
    },
    required: true
  },
  id: String
})

app.post('/api/persons', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
      response.json("Must include name and number!")
      return
  }
  const newPerson = new phonebookEntry({
      name: request.body.name,
      number: request.body.number,
      id: Math.floor(Math.random() * 1000)
  })
  newPerson.save()
  .then(update => response.json(update))
  .catch(error => {
    next(error)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

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

app.put('/api/persons/:id', (request, response, next) => {
  const updatedEntry = {
    name: request.body.name,
    number: request.body.number,
    id: request.body.id
  }
  phonebookEntry.findByIdAndUpdate(request.body.id, updatedEntry, {new: true})
    .then(updatedEntry => {
      response.json(updatedEntry)
    }).catch(error => next(error))
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World! Persons at <a href="/api/persons">this</a> link</h1>')
  })

  app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br>${new Date()}`)
  })

  app.delete('/api/persons/:id', (request, response, next) => {
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



  app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const person = phonebookEntry.findById(id).then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    }).catch(error => {
      next(error)
    })
  })
  
  const PORT =  process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })