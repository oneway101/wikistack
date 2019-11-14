const express = require('express')
const morgan = require('morgan')
const { db } = require('./models');


const app = express()

app.use(morgan('dev'))

const init = async () => {
  await db.User.sync()
  await db.Page.sync()

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}

init()

// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })
