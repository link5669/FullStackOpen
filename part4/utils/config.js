// require('dotenv').config()

const PORT = process.env.PORT || 3003

// const MONGODB_URI = process.env.NODE_ENV === 'test' 
//   ? process.env.TEST_MONGODB_URI
//   : process.env.MONGODB_URI
const MONGODB_URI = 'mongodb+srv://link5669:56695669@cluster0.ze2xi6m.mongodb.net/?retryWrites=true&w=majority'

module.exports = {
  MONGODB_URI,
  PORT
}
