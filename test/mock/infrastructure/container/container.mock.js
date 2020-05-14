// container.mock.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Module store
const moduleStore = {};

const loggerMock = require('../log/logger.mock');

exports.getLogger = () => loggerMock;

const set = (name, pathfile) => {
  moduleStore[name] = require(pathfile);
};

exports.get = (nameModule) => moduleStore[nameModule];

// const c = require('../log/logger.mock')

exports.init = () => {
  // Logger
  set('logger', '../log/logger.mock');
  // Infrastructure Controllers (OpenApi Express Controllers)
  // set('healthcheckController', '../server/controller/healthcheckController');
  // set('getConfigController', '../../infrastructure/server/controller/getConfigController');
  // Infrastructure Repositories
  // set('fileConfigRepository', '../repository/fileConfigRepository');
  // set('remoteConfigRepository', '../repository/remoteConfigRepository');
  // set('memConfigRepository', '../repository/memConfigRepository');
  set('containerConfigRepository', '../repository/configRepository.mock');
  // Adapter Interface Components
  set('loadConfigAdapterController', '../../adapter/controller/loadConfigAdapterController.mock');
  set('getConfigAdapterController', '../../adapter/controller/getConfigAdapterController.mock');
  set('configJSONPresenter', '../../adapter/presenter/presenter.mock');
  // set('configYAMLPresenter', '../../adapter/presenter/configYAMLPresenter');
};

exports.init();
