// app.js

// Infrastructure

const fileConfigRepository = require('../../infrastructure/repository/fileConfigRepository');
const memConfigRepository = require('../../infrastructure/repository/memConfigRepository');

// const log = require('../../infrastructure/log/consoleLogger');
const log = require('../../infrastructure/log/logColorLogger');

// Interface Adapters

const loadConfigAdapterController = require('../../adapter/controller/loadConfigAdapterController');
const getConfigAdapterController = require('../../adapter/controller/getConfigAdapterController');
const configJSONPresenter = require('../../adapter/presenter/configJSONPresenter');
const configYAMLPresenter = require('../../adapter/presenter/configYAMLPresenter');

// Init

// Execution

const loadConfig = async () => loadConfigAdapterController.execute(fileConfigRepository, memConfigRepository, configJSONPresenter, log, 'chassis.yaml');

const getConfigInJSON = () => getConfigAdapterController.execute(fileConfigRepository, configJSONPresenter, log, 'chassis.yaml');

const getConfigInYAML = () => getConfigAdapterController.execute(fileConfigRepository, configYAMLPresenter, log, 'chassis.yaml');

(async () => {
  let result;

  // Init logger
  log.init({ level: 'debug' });

  await loadConfig();

  result = await getConfigInJSON();
  log.debug(`result in JSON: ${JSON.stringify(result)}`);
  result = await getConfigInYAML();
  log.debug(`result in YAML: ${JSON.stringify(result)}`);
})();
