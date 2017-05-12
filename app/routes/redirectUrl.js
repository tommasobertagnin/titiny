const config = require('../../server/config')

module.exports = (app, db) => {
  app.get('/:url*', (req, res) => {
    db.collection(config.URL_COLLECTION)
      .findOne({ hash: req.path.substring(1) })
      .then(doc => {
        if (doc) {
          res.redirect(doc.original_url)
        } else {
          res.status(404).json({ error: 'the  URL provided is not in the database'})
        }
      })
      .catch(err => {
        db.collection(config.LOG_COLLECTION)
          .insertOne({ type: 'error', err })
      })
  })
}