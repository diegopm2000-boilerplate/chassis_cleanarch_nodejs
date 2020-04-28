// app.js

// Infrastructure

const apiserver = require('../../infrastructure/server/openapiexpress');

const healthcheckInfraController = require('../../infrastructure/server/controllers/healthcheckController');

// const fileConfigRepository = require('../../infrastructure/file/fileConfigRepository');
// const memConfigRepository = require('../../infrastructure/memory/memConfigRepository');

// const log = require('../../infrastructure/log/consoleLogger');
const logger = require('../../infrastructure/log/logColorLogger');

// Interface Adapters

// const configController = require('../../adapter/controller/configController');
// const configJSONPresenter = require('../../adapter/presenter/configJSONPresenter');
// const configYAMLPresenter = require('../../adapter/presenter/configYAMLPresenter');

// Init

(async () => {
  // Init logger
  logger.init({ level: 'debug' });

  // Init infrastructure controllers
  healthcheckInfraController.init(logger);

  // Init server & start
  apiserver.init(logger);
  apiserver.start({ port: 8080, apiDocument: './src/infrastructure/api/openapi.yaml', serverTimeout: 50000 });
})();
