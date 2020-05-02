// app.js

/* eslint-disable no-console */

const container = require('../../infrastructure/container/container');

const apiserver = require('../../infrastructure/server/openapiexpress');

const MODULE_NAME = '[App]';

const YAML_FILE = 'YAML_FILE';

const APIDOC_BASEPATH = './src/infrastructure/api';

const loadConfig = async (initialRepositoryName, destinyRepositoryName, logger, filename) => {
  const funcName = loadConfig.name;
  logger.info(`${MODULE_NAME}:${funcName} (IN) --> filename: ${filename}}`);

  const loadConfigAdapterController = container.get('loadConfigAdapterController');
  const initialRepository = container.get(initialRepositoryName);
  const destinyRepository = container.get(destinyRepositoryName);
  const presenter = container.get('configJSONPresenter');

  await loadConfigAdapterController.execute(initialRepository, destinyRepository, presenter, logger, filename);
  logger.info(`${MODULE_NAME}:${funcName} (OUT) --> config loaded OK`);
};

const loadEnvVars = () => {
  const funcName = loadEnvVars.name;
  console.log(`${MODULE_NAME}${funcName} (IN) --> no params`);

  const result = {
    configSource: process.env.NODE_CONFIG_SOURCE_APP,
    configFileName: process.env.NODE_CONFIG_FILE,
    configPort: process.env.NODE_CONFIG_PORT_APP,
    apiDoc: process.env.NODE_CONFIG_APIFILE,
    configSpringCfg: process.env.NODE_CONFIG_SPRINGCFG_ENDPOINT,
  };

  console.log(`${MODULE_NAME}${funcName} (OUT) --> result: ${JSON.stringify(result)}`);

  return result;
};

const initConfig = async (envVars, logger) => {
  // TODO load config from springcloudconfig (remote repository)

  // Init Configuration
  if (YAML_FILE === envVars.configSource) {
    const initialRepositoryName = 'fileConfigRepository';
    const destinyRepositoryName = 'containerConfigRepository';
    await loadConfig(initialRepositoryName, destinyRepositoryName, logger, envVars.configFileName);
  } else {
    logger.error(`${MODULE_NAME} (ERROR) --> config source not valid!`);
    throw new Error('Config Source not valid!');
  }
};

(async () => {
  console.log(`${MODULE_NAME} (IN) --> Initializing Application...`);

  // Init Environment Variables
  const envVars = loadEnvVars();

  // Init Container
  container.init();
  console.log(`${MODULE_NAME} (MID) --> Container initialized OK`);

  // Init logger
  const logger = container.getLogger();
  container.getLogger().init({ level: 'debug' });
  logger.debug(`${MODULE_NAME} (MID) --> Logger initialized OK`);

  // Init Configuration
  await initConfig(envVars, logger);
  logger.debug(`${MODULE_NAME} (MID) --> Config initialized OK`);

  // Init server & start
  apiserver.start({ port: envVars.configPort, apiDocument: `${APIDOC_BASEPATH}/${envVars.apiDoc}`, serverTimeout: 50000 });
})();
