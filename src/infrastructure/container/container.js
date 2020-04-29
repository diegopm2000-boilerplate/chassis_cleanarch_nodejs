// container.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// const a = require('../memory/memConfigRepository');

const store = {};

const set = (name, pathfile) => {
  store[name] = require(pathfile);
};

const get = (name) => store[name];

const init = () => {
  // Logger
  set('logger', '../log/logColorLogger');
  // Infrastructure Controllers (OpenApi Express Controllers)
  set('healthcheckController', '../server/controller/healthcheckController');
  set('configController', '../../infrastructure/server/controller/configController');
  // Infrastructure Repositories
  set('fileConfigRepository', '../file/fileConfigRepository');
  set('memConfigRepository', '../memory/memConfigRepository');
  // Adapter Interface Components
  set('configAdapterController', '../../adapter/controller/configAdapterController');
  set('configJSONPresenter', '../../adapter/presenter/configJSONPresenter');
};

const getLogger = () => get('logger');

const getHealthcheckController = () => get('healthcheckController');

const getConfigController = () => get('configController');

const getFileConfigRepository = () => get('fileConfigRepository');

const getMemConfigRepository = () => get('memConfigRepository');

const getConfigAdapterController = () => get('configAdapterController');

const getConfigJSONPresenter = () => get('configJSONPresenter');

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
  getConfigAdapterController,
  getConfigJSONPresenter,
};
