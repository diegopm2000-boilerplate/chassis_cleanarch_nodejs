// container.mock.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Module store
const moduleStore = {};

const loggerMock = require('../log/logger.mock');

exports.getLogger = () => loggerMock;

const set = ({ name, pathfile }) => {
  moduleStore[name] = require(pathfile);
};

exports.get = (nameModule) => moduleStore[nameModule];

const arrayObj = [
  // Logger
  { name: 'logger', pathfile: '../log/logger.mock' },
  // Infrastructure Controllers (OpenApi Express Controllers)
  { name: 'healthcheckController', pathfile: '../../infrastructure/server/controller/healthcheckController.mock' },
  { name: 'getConfigController', pathfile: '../../infrastructure/server/controller/getConfigController.mock' },
  // Infrastructure Repositories
  { name: 'fileConfigRepository', pathfile: '../repository/configRepository.mock' },
  { name: 'remoteConfigRepository', pathfile: '../repository/configRepository.mock' },
  { name: 'containerConfigRepository', pathfile: '../repository/configRepository.mock' },
  // Adapter Interface Components -- Presenters
  { name: 'configJSONPresenter', pathfile: '../../adapter/presenter/presenter.mock' },
  { name: 'configYAMLPresenter', pathfile: '../../adapter/presenter/presenter.mock' },
  // Use Cases
  { name: 'getConfigUC', pathfile: '../../usecase/loadConfigUC.mock' },
  { name: 'loadConfigUC', pathfile: '../../usecase/getConfigUC.mock' },
];

exports.defaultInit = () => {
  set({ name: 'logger', pathfile: '../log/logger.mock' });
};

exports.init = () => {
  arrayObj.forEach((x) => set(x));
};

exports.init();
