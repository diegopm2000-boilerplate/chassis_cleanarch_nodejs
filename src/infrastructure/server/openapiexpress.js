// openapiexpress.js

const express = require('express');
const expressOpenapi = require('express-openapi');
const timeout = require('connect-timeout');

const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const YAML = require('yamljs');

const container = require('../container/container');
const security = require('../security/security');

const MODULE_NAME = '[OpenApiExpress Server]';

const DEFAULT_PORT = 8080;
const DEFAULT_REQUEST_TIMEOUT = '50s';

let server;

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${err.stack}`);

  const status = (err.status) ? err.status : 500;
  const errorObj = { code: status, message: err.message };
  res.status(status).json(errorObj);
};

// eslint-disable-next-line no-unused-vars
const routeNotFoundErrorHandler = (req, res, next) => {
  const errorObj = { code: 404, message: `Cannot ${req.method} ${req.path}` };
  res.status(404).json(errorObj);
};

exports.start = async ({
  port, apiDocument, serverTimeout, enableCors,
}) => new Promise((resolve, reject) => {
  try {
    container.getLogger().info(`${MODULE_NAME} (IN) --> port: ${port}, apiDocument: ${apiDocument}, serverTimeout: ${serverTimeout}`);

    // Instance Expresss
    const app = express();

    // Handle the server timeout
    app.use(timeout(serverTimeout || DEFAULT_REQUEST_TIMEOUT));

    // Define the app listen port
    const appPort = port || DEFAULT_PORT;
    server = app.listen(appPort);

    // Init Security
    security.init(app);

    // Initialize ExpressOpenApi
    expressOpenapi.initialize({
      app,
      apiDoc: apiDocument,
      consumesMiddleware: {
        'application/json': bodyParser.json(),
      },
      errorMiddleware: errorHandler,
      // Put your operation controllers here
      operations: {
        check: container.get('healthcheckController').execute,
        getConfig: container.get('getConfigController').execute,
      },
    });

    // Expose documentation using swagger-ui-express
    const swaggerDocument = YAML.load(apiDocument);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Specific route for handle the 404 route not found
    app.use(routeNotFoundErrorHandler);

    // Enable CORS
    if (enableCors) {
      container.getLogger().info(`${MODULE_NAME} (MID) --> Enabling CORS`);
      app.use(cors());
    }

    // TODO falta privatización API

    const appServerStatus = {
      appPort,
      enableCors,
    };

    container.getLogger().info(`${MODULE_NAME} (MID) --> appServerStatus: ${JSON.stringify(appServerStatus)}`);

    resolve(true);
  } catch (error) {
    container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${error.stack}`);
    reject(new Error('Express did not start correctly!'));
  }
});

exports.stop = () => {
  server.close(() => { container.getLogger().info('App Server stopped'); });
};
