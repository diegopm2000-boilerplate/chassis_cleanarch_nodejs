// app.js

/* eslint-disable no-console */

const container = require('../../infrastructure/container/container');

const apiserver = require('../../infrastructure/server/openapiexpress');

const MODULE_NAME = '[App]';

const YAML_FILE = 'YAML_FILE';

const APIDOC_BASEPATH = './src/infrastructure/api';

(async () => {
  console.log(`${MODULE_NAME} (IN) --> Initializing Application...`);

  // Loading environment variables
  const configSource = process.env.NODE_CONFIG_SOURCE_APP;
  console.log(`NODE_CONFIG_SOURCE: ${configSource}`);
  // const configSpringCfg = process.env.NODE_CONFIG_SPRINGCFG_ENDPOINT;
  const configFile = process.env.NODE_CONFIG_FILE;
  console.log(`NODE_CONFIG_FILE: ${configFile}`);
  const configPort = process.env.NODE_CONFIG_PORT_APP;
  console.log(`NODE_CONFIG_PORT: ${configPort}`);
  const apiDoc = process.env.NODE_CONFIG_APIFILE;
  console.log(`NODE_CONFIG_APIFILE: ${apiDoc}`);

  // Init Container
  container.init();
  console.log(`${MODULE_NAME} (MID) --> Container initialized OK`);
  // Init logger
  container.getLogger().init({ level: 'debug' });
  const logger = container.getLogger();
  logger.debug(`${MODULE_NAME} (MID) --> logger initialized OK`);

  // Load Configuration

  if (YAML_FILE === configSource) {
    // Load configuration from file and set in memory
    const config = await container.getFileConfigRepository().getConfig(configFile);
    logger.debug(`${MODULE_NAME} (MID) --> config loaded: ${JSON.stringify(config)}`);
    await container.getContainerConfigRepository().setConfig(config);
    logger.debug(`${MODULE_NAME} (MID) --> config stored in ContainerRepository`);
  } else {
    logger.error(`${MODULE_NAME} (ERROR) --> config source not valid!`);
    throw new Error('Config Source not valid!');
  }

  // Init server & start
  apiserver.start({ port: configPort, apiDocument: `${APIDOC_BASEPATH}/${apiDoc}`, serverTimeout: 50000 });
})();
