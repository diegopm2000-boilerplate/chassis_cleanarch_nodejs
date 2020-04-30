// container.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// const a = require('../memory/memConfigRepository');

// Module store
const moduleStore = {};
// Config store
let configStore = {};

exports.set = (name, pathfile) => {
  moduleStore[name] = require(pathfile);
};

exports.get = (name) => moduleStore[name];

exports.init = () => {
  // Logger
  exports.set('logger', '../log/logColorLogger');
  // Infrastructure Controllers (OpenApi Express Controllers)
  exports.set('healthcheckController', '../server/controller/healthcheckController');
  exports.set('configController', '../../infrastructure/server/controller/configController');
  // Infrastructure Repositories
  exports.set('fileConfigRepository', '../repository/fileConfigRepository');
  exports.set('memConfigRepository', '../repository/memConfigRepository');
  exports.set('containerConfigRepository', '../repository/containerConfigRepository');
  // Adapter Interface Components
  exports.set('configAdapterController', '../../adapter/controller/configAdapterController');
  exports.set('configJSONPresenter', '../../adapter/presenter/configJSONPresenter');
};

exports.getLogger = () => exports.get('logger');

exports.getHealthcheckController = () => exports.get('healthcheckController');

exports.getConfigController = () => exports.get('configController');

exports.getFileConfigRepository = () => exports.get('fileConfigRepository');

exports.getMemConfigRepository = () => exports.get('memConfigRepository');

exports.getContainerConfigRepository = () => exports.get('containerConfigRepository');

exports.getConfigAdapterController = () => exports.get('configAdapterController');

exports.getConfigJSONPresenter = () => exports.get('configJSONPresenter');

exports.getConfig = () => configStore;

exports.setConfig = (data) => {
  configStore = data;
};
