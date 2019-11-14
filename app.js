const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');
const wikiRoute = require('./routes/wiki');
const userRoute = require('./routes/user');



//const models = require('./models')

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + "/static"));

const init = async () => {
  await db.sync({force: true})
  // await models.db.async()
  // await models.User.async()
  // await models.Page.async()
  app.listen(3000, () => {
    console.log(`Server is listening on port`)
  })
}

db.authenticate().
then(() => {
  console.log('connected to the database');
})

init()
app.use('/wiki', wikiRoute);
