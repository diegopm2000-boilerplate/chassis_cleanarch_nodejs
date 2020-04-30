// app.js

/* eslint-disable no-console */

const container = require('../../infrastructure/container/container');

const apiserver = require('../../infrastructure/server/openapiexpress');

const MODULE_NAME = '[App]';

(async () => {
  console.log(`${MODULE_NAME} (IN) --> Initializing Application...`);
  // Init Container
  container.init();
  console.log(`${MODULE_NAME} (MID) --> Container initialized OK`);
  // Init logger
  container.getLogger().init({ level: 'debug' });
  const logger = container.getLogger();
  logger.debug(`${MODULE_NAME} (MID) --> logger initialized OK`);

  // TODO load config from env variables as usual

  // Load configuration from file and set in memory
  const config = await container.getFileConfigRepository().getConfig('chassis.yml');
  logger.debug(`${MODULE_NAME} (MID) --> config loaded: ${JSON.stringify(config)}`);

  await container.getContainerConfigRepository().setConfig(config);
  logger.debug(`${MODULE_NAME} (MID) --> config stored in ContainerRepository`);

  // Init server & start
  apiserver.start({ port: 8080, apiDocument: './src/infrastructure/api/openapi.yaml', serverTimeout: 50000 });
})();
