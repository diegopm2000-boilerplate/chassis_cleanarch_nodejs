// container.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// const a = require('../memory/memConfigRepository');

// Module store
const moduleStore = {};
// Config store
let configStore = {};

const set = (name, pathfile) => {
  moduleStore[name] = require(pathfile);
};

const get = (name) => moduleStore[name];

const init = () => {
  // Logger
  set('logger', '../log/logColorLogger');
  // Infrastructure Controllers (OpenApi Express Controllers)
  set('healthcheckController', '../server/controller/healthcheckController');
  set('configController', '../../infrastructure/server/controller/configController');
  // Infrastructure Repositories
  set('fileConfigRepository', '../repository/fileConfigRepository');
  set('memConfigRepository', '../repository/memConfigRepository');
  set('containerConfigRepository', '../repository/containerConfigRepository');
  // Adapter Interface Components
  set('configAdapterController', '../../adapter/controller/configAdapterController');
  set('configJSONPresenter', '../../adapter/presenter/configJSONPresenter');
};

const getLogger = () => get('logger');

const getHealthcheckController = () => get('healthcheckController');

const getConfigController = () => get('configController');

const getFileConfigRepository = () => get('fileConfigRepository');

const getMemConfigRepository = () => get('memConfigRepository');

const getContainerConfigRepository = () => get('containerConfigRepository');

const getConfigAdapterController = () => get('configAdapterController');

const getConfigJSONPresenter = () => get('configJSONPresenter');

const getConfig = () => configStore;

const setConfig = (data) => {
  configStore = data;
};

module.exports = {
  init,
  set,
  get,
  // Logger
  getLogger,
  // Infrastructure Controllers (OpenApi Express Controllers)
  getHealthcheckController,
  getConfigController,
  // Infrastructure Repositories
  getFileConfigRepository,
  getMemConfigRepository,
  getContainerConfigRepository,
  getConfigAdapterController,
  getConfigJSONPresenter,
  getConfig,
  setConfig,
};
