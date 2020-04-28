// openapiexpress.js

const express = require('express');
const expressOpenapi = require('express-openapi');

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const YAML = require('yamljs');

// Put your infrastructure controllers here
const healthcheckController = require('./controllers/healthcheckController');

const DEFAULT_PORT = 8080;
const DEFAULT_REQUEST_TIMEOUT = 50000;
const DEFAULT_SOCKET_TIMEOUT = 300000;

let logger;

exports.init = (log) => {
  logger = log;
};

exports.start = async ({ port, apiDocument, serverTimeout }) => new Promise((resolve, reject) => {
  try {
    // Instance Expresss
    const app = express();

    const appPort = port || DEFAULT_PORT;
    module.exports.server = app.listen(appPort);

    // Initialize ExpressOpenApi
    expressOpenapi.initialize({
      app,
      apiDoc: apiDocument,
      consumesMiddleware: {
        'application/json': bodyParser.json(),
      },
      operations: {
        check: healthcheckController.check,
      },
    });

    // Socket timeout
    module.exports.server.timeout = DEFAULT_SOCKET_TIMEOUT;

    // Request timeout (in ms)
    const serverTimeOut = serverTimeout || DEFAULT_REQUEST_TIMEOUT;
    module.exports.server.setTimeout(serverTimeOut);

    // Error Handler
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      logger.error(`error --> ${err.stack}`);
      res.status(err.status).json(err);
    });

    // Exposes documentation using swagger-ui-express
    const swaggerDocument = YAML.load(apiDocument);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    logger.info(`App Server started at port: ${appPort} and Running OK!`);

    resolve(true);
  } catch (error) {
    logger.error(`error: ${error.stack}`);
    reject(new Error('Express did not start correctly!'));
  }
});

exports.stop = () => {
  module.exports.server.close(() => { logger.info('App Server stopped'); });
};
