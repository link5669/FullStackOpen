const mongoose = require('mongoose')
let numArgs = process.argv.length

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

  const password = process.argv[2]
  const url = `mongodb+srv://link5669:${password}@cluster0.xokpdrt.mongodb.net/myFirstDatabase`

  const phonebookSchema = new mongoose.Schema({
    name: String,
    number: Number
  })

  const phonebookEntry = mongoose.model('PhonebookEntry', phonebookSchema)

  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    if (numArgs == 3) {
        findAll()
    } 
        const entry = new phonebookEntry({
            name: process.argv[3],
            number: process.argv[4]
        })
        console.log('entry saved!')
        return entry.save()
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))

  async function findAll() {
    await phonebookEntry.find({}).then(result => {
        result.forEach(entry => {
          console.log(entry)
        })
      })
  }