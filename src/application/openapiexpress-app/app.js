// app.js

/* eslint-disable no-console */

const container = require('../../infrastructure/container/container');

const apiserver = require('../../infrastructure/server/openapiexpress');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[App]';

// Config sources
const YAML_FILE = 'YAML_FILE';
const GIT = 'GIT';

const APIDOC_BASEPATH = './src/infrastructure/api';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

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
  const funcName = initConfig.name;
  logger.info(`${MODULE_NAME}:${funcName} (IN) --> envVars: ${JSON.stringify(envVars)}`);

  if (envVars.configSource !== YAML_FILE && envVars.configSource !== GIT) {
    const msgError = 'Config Source not valid';
    logger.error(`${MODULE_NAME}:${funcName} (ERROR) --> error.message: ${msgError}`);
    throw new Error(msgError);
  }

  const endpoint = envVars.configSpringCfg;
  const initialRepositoryName = (YAML_FILE === envVars.configSource) ? 'fileConfigRepository' : 'remoteConfigRepository';
  const filename = envVars.configFileName;
  const loadConfigUC = container.get('loadConfigUC');

  const initialRepository = container.get(initialRepositoryName);
  const destinyRepository = container.get('containerConfigRepository');
  const presenter = container.get('configJSONPresenter');

  await loadConfigUC.execute(initialRepository, destinyRepository, presenter, logger, filename, endpoint);
  logger.info(`${MODULE_NAME}:${funcName} (OUT) --> config loaded OK`);

  return true;
};

// //////////////////////////////////////////////////////////////////////////////
// Unhandled Rejection Handler
// //////////////////////////////////////////////////////////////////////////////

process.on('unhandledRejection', (err, p) => {
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> An unhandledRejection occurred...`);
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> Rejected Promise: ${p}`);
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> Rejection: ${err}`);
});

// //////////////////////////////////////////////////////////////////////////////
// Init
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  let logger;
  try {
    console.log(`${MODULE_NAME} (IN) --> Initializing Application...`);

    // Init Environment Variables
    const envVars = loadEnvVars();

    // Init Container
    container.init();
    console.log(`${MODULE_NAME} (MID) --> Container initialized OK`);

    // Init logger
    logger = container.getLogger();
    container.getLogger().init({ level: 'debug' });
    logger.debug(`${MODULE_NAME} (MID) --> Logger initialized OK`);

    // Init Configuration
    await initConfig(envVars, logger);
    logger.debug(`${MODULE_NAME} (MID) --> Config initialized OK`);

    // Init server & start
    apiserver.start({ port: envVars.configPort, apiDocument: `${APIDOC_BASEPATH}/${envVars.apiDoc}`, serverTimeout: 50000 });
    return true;
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) --> error: ${error.stack}`);
    return false;
  }
};

require('make-runnable');
