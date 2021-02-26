const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const paramsProc = require('n-params-processor')
const config = require('../config/environment')
const appgl = require('./_common/graph-ql')
const logger = require('./_common/utils/logger')

module.exports = (app) => {
  require('./users/routes')(app)

  let isDevEnv = config.get('env') === 'development'
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: appgl.schema,
      rootValue: appgl.root,
      graphiql: isDevEnv,
      pretty: isDevEnv,
      customFormatErrorFn(err) {
        return _processGraphQLError(err)
      }
    })
  )

  app.get('*', (req, res) => {
    let indexPage = path.join(config.get('publicPath'), 'index.html')
    res.sendFile(indexPage)
  })

  // eslint-disable-next-line no-unused-vars, max-params
  app.use((err, req, res, next) => {
    _processAppError(err, res)
  })
}

// eslint-disable-next-line max-statements
function _processGraphQLError(err) {
  let originalError = err.originalError
  if (originalError instanceof paramsProc.ParamsProcessorError) {
    err.status = 422
    return err
  }
  if (originalError && originalError.statusCode < 500) {
    err.status = originalError.statusCode
    return err
  }

  logger.error({ message: err })
  err = new Error('Unexpected server error')
  err.status = 500
  return err
}

function _processAppError(err, res) {
  if (err instanceof paramsProc.ParamsProcessorError) {
    return res.status(422).send({ message: err.message })
  }
  if (err.statusCode < 500) {
    return res.status(err.statusCode).send({
      message: err.message,
      info: err.info
    })
  }

  // istanbul ignore next
  switch (process.env.NODE_ENV) {
    case 'test':
    case 'development':
      logger.error('Unexpected server error', err, err.stack)
      break
    case 'production':
      logger.error('Unexpected server error', err)
      break
  }

  logger.error({ message: err })
  res.status(err.statusCode || 500).send({ message: 'Unexpected server error' })
}
