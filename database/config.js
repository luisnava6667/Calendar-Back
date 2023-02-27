const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      //   useCreateIndex: true,
    })
    console.log('BD conection', dbConnection)
  } catch (error) {
    console.log(error)
    throw new Error('Error to connect to Mongo')
  }
}
module.exports = dbConnection
