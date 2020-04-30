// app.js

const container = require('../../infrastructure/container/container');

const apiserver = require('../../infrastructure/server/openapiexpress');

(async () => {
  // Init Container
  container.init();

  // Init logger
  container.getLogger().init({ level: 'debug' });

  // Load configuration from file and set in memory
  const config = await container.getFileConfigRepository().getConfig('chassis.yml');
  container.getLogger().debug(`config: ${JSON.stringify(config)}`);
  await container.getContainerConfigRepository().setConfig(config);

  // Init server & start
  apiserver.start({ port: 8080, apiDocument: './src/infrastructure/api/openapi.yaml', serverTimeout: 50000 });
})();
