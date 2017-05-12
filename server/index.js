const config = require('./config')
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const routes = require('../app/routes')
const logger = require('./logger')

const app = express()

app.listen(process.env.PORT || 8080, () => {
  MongoClient.connect(config.DB_URL)
    .then(db => {
      db.createCollection(config.LOG_COLLECTION, { capped : true, size : 5242880 } )
      db.createCollection(config.URL_COLLECTION, { capped : true, size : 5242880 } )
      //mount all the routes and logger middleware
      logger(app, db)
      routes(app, db)
    })
    .catch(err => { throw new Error(err) })
})