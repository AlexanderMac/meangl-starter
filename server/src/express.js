const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const config = require('../config/environment')

module.exports = (app) => {
  app.set('views', config.get('viewsPath'))
  app.set('port', config.get('port'))

  // istanbul ignore next
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
  }
  app.use(helmet({
    contentSecurityPolicy: false
  }))
  // TODO: uncomment for favicon:
  // app.use(favicon(path.join(config.get('rootPath'), 'client', 'images', 'favicon.ico')))
  app.use(express.static(config.get('publicPath')))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
}
