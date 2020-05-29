const path = require('path');
const paramsProc = require('n-params-processor');
const config = require('../config/environment');
const logger = require('./_common/util/logger');

module.exports = (app) => {
  require('./users/routes')(app);

  app.get('*', (req, res) => {
    let indexPage = path.join(config.get('publicPath'), 'index.html');
    res.sendFile(indexPage);
  });

  // eslint-disable-next-line no-unused-vars, max-params
  app.use((err, req, res, next) => {
    if (err instanceof paramsProc.ParamsProcessorError) {
      return res.status(422).send({ message: err.message });
    }
    if (err.statusCode < 500) {
      return res.status(err.statusCode).send({
        message: err.message,
        info: err.info
      });
    }

    // istanbul ignore next
    switch (process.env.NODE_ENV) {
      case 'test':
      case 'development':
        logger.error('Unexpected server error', err, err.stack);
        break;
      case 'production':
        logger.error('Unexpected server error', err);
        break;
    }

    err = new Error('Unexpected server error');
    res.status(err.statusCode || 500).send({ message: 'Unexpected server error' });
  });
};
