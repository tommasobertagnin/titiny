module.exports = (app, db) => {
  require('./home')(app)
  require('./shortenUrl')(app, db)
  require('./redirectUrl')(app, db)
}