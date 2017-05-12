const R = require('ramda')
const sha1 = require('sha1')
const config = require('../../server/config')

const regexUrl = /^https?:\/\/[\w\.]+\.\w{2,}(:\d{2}|:\d{4})?(\/[\w\.\/\?\=\#]{0,})?$/
const cleanUrl = R.replace('/shorten/', '')
const isValidUrl = R.compose(R.test(regexUrl), cleanUrl)

module.exports = (app, db) => {
  app.get('/shorten/:url*', (req, res) => {
    if (isValidUrl(req.originalUrl)) {
      const url = cleanUrl(req.originalUrl)
      const host = req.get('host')

      db.collection(config.URL_COLLECTION)
        .findOne({ original_url: url }, { _id: 0 })
        .then(doc => {
          if (doc) {
            res.json({
              original_url: doc.original_url,
              short_url: host + '/' + doc.hash
            })
          } else {
            const hash = sha1(url).substring(0, 6)
            res.json({
              original_url: url,
              short_url: host + '/' + hash,
            })
            db.collection(config.URL_COLLECTION)
              .insertOne({ original_url: url, hash })
          }
        })
        .catch(err => {
          db.collection(config.LOG_COLLECTION)
            .insertOne({ type: 'error', err })
        })
    } else {
      res.status(400).json({ error: 'the URL provided is not valid' })
    }
  })
}