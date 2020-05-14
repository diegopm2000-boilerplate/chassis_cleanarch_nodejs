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

let server;

// TODO mejorar este error...si falla la ruta, pues da que res.status no es una funcion
const errorHandler = (err, req, res) => {
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${err.stack}`);
  res.status(err.status).json(err);
};

exports.start = async ({ port, apiDocument, serverTimeout }) => new Promise((resolve, reject) => {
  try {
    container.getLogger().info(`${MODULE_NAME} (IN) --> port: ${port}, apiDocument: ${apiDocument}, serverTimeout: ${serverTimeout}`);

    // Instance Expresss
    const app = express();

    const appPort = port || DEFAULT_PORT;
    server = app.listen(appPort);

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
    server.timeout = DEFAULT_SOCKET_TIMEOUT;

    // Request timeout (in ms)
    const serverTimeOut = serverTimeout || DEFAULT_REQUEST_TIMEOUT;
    server.setTimeout(serverTimeOut);

    // Error Handler
    // eslint-disable-next-line no-unused-vars
    app.use(errorHandler);

    // Exposes documentation using swagger-ui-express
    const swaggerDocument = YAML.load(apiDocument);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    container.getLogger().info(`${MODULE_NAME} (OUT) --> App Server started at port: ${appPort} and Running OK!`);

    // TODO
    // falta soporte CORS

    // TODO
    // falta securización API (Helmet)

    // TODO
    // falta privatización API
    resolve(true);
  } catch (error) {
    container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${error.stack}`);
    reject(new Error('Express did not start correctly!'));
  }
});

exports.stop = () => {
  server.close(() => { container.getLogger().info('App Server stopped'); });
};
