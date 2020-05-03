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

exports.get = (nameModule) => moduleStore[nameModule];

exports.init = () => {
  // Logger
  set('logger', '../log/logColorLogger');
  // Infrastructure Controllers (OpenApi Express Controllers)
  set('healthcheckController', '../server/controller/healthcheckController');
  set('getConfigController', '../../infrastructure/server/controller/getConfigController');
  // Infrastructure Repositories
  set('fileConfigRepository', '../repository/fileConfigRepository');
  set('remoteConfigRepository', '../repository/remoteConfigRepository');
  set('memConfigRepository', '../repository/memConfigRepository');
  set('containerConfigRepository', '../repository/containerConfigRepository');
  // Adapter Interface Components
  set('loadConfigAdapterController', '../../adapter/controller/loadConfigAdapterController');
  set('getConfigAdapterController', '../../adapter/controller/getConfigAdapterController');
  set('configJSONPresenter', '../../adapter/presenter/configJSONPresenter');
};

exports.getLogger = () => exports.get('logger');

exports.getConfig = () => configStore;

exports.setConfig = (data) => {
  configStore = data;
};
