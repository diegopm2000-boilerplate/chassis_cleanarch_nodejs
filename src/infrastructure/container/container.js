// container.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Module store
const moduleStore = {};
// Config store
let configStore = {};

const set = (name, pathfile) => {
  moduleStore[name] = require(pathfile);
};

exports.get = (nameModule) => moduleStore[nameModule];

// TODO pasar esto a un array de objetos y llamar a set con cada valor!!!
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
  // -- Presenters
  set('configJSONPresenter', '../../adapter/presenter/configJSONPresenter');
  set('configYAMLPresenter', '../../adapter/presenter/configYAMLPresenter');
  // Use Cases
  set('getConfigUC', '../../usecase/getConfigUC');
  set('loadConfigUC', '../../usecase/loadConfigUC');
};

exports.getLogger = () => exports.get('logger');

exports.getConfig = () => configStore;

exports.setConfig = (data) => {
  configStore = data;
};
