const config = require('./config')

module.exports = (app, db) => {
  app.use('/', (req, res, next) => {
    db.collection(config.LOG_COLLECTION)
      .insertOne({
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        time: (new Date()).getTime()
      })
    next()
  })
}