// openapiexpress.js

const express = require('express');
const expressOpenapi = require('express-openapi');

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const YAML = require('yamljs');

const container = require('../container/container');

const MODULE_NAME = '[OpenApiExpress Server]';

const DEFAULT_PORT = 8080;
const DEFAULT_REQUEST_TIMEOUT = 50000;
const DEFAULT_SOCKET_TIMEOUT = 300000;

exports.start = async ({ port, apiDocument, serverTimeout }) => new Promise((resolve, reject) => {
  try {
    container.getLogger().info(`${MODULE_NAME} (IN) --> port: ${port}, apiDocument: ${apiDocument}, serverTimeout: ${serverTimeout}`);

    // Instance Expresss
    const app = express();

    const appPort = port || DEFAULT_PORT;
    module.exports.server = app.listen(appPort);

    // TODO refactor the extraction of controller methods!!!

    // Initialize ExpressOpenApi
    expressOpenapi.initialize({
      app,
      apiDoc: apiDocument,
      consumesMiddleware: {
        'application/json': bodyParser.json(),
      },
      operations: {
        check: container.get('healthcheckController').execute,
        getConfig: container.get('getConfigController').execute,
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
      container.logger.error(`${MODULE_NAME} (ERROR) --> error: ${err.stack}`);
      res.status(err.status).json(err);
    });

    // Exposes documentation using swagger-ui-express
    const swaggerDocument = YAML.load(apiDocument);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    container.getLogger().info(`${MODULE_NAME} (OUT) --> App Server started at port: ${appPort} and Running OK!`);

    resolve(true);
  } catch (error) {
    container.logger.error(`${MODULE_NAME} (ERROR) --> error: ${error.stack}`);
    reject(new Error('Express did not start correctly!'));
  }
});

exports.stop = () => {
  module.exports.server.close(() => { container.getLogger().info('App Server stopped'); });
};
