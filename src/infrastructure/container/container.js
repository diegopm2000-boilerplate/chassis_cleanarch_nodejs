// container.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Module store
const moduleStore = {};
// Config store
let configStore = {};

const set = ({ name, pathfile }) => {
  moduleStore[name] = require(pathfile);
};

exports.get = (nameModule) => moduleStore[nameModule];

const arrayObj = [
  // Logger
  { name: 'logger', pathfile: '../log/logColorLogger' },
  // Infrastructure Controllers (OpenApi Express Controllers)
  { name: 'healthcheckController', pathfile: '../server/controller/healthcheckController' },
  { name: 'getConfigController', pathfile: '../../infrastructure/server/controller/getConfigController' },
  // Infrastructure Repositories
  { name: 'fileConfigRepository', pathfile: '../repository/fileConfigRepository' },
  { name: 'remoteConfigRepository', pathfile: '../repository/remoteConfigRepository' },
  { name: 'containerConfigRepository', pathfile: '../repository/containerConfigRepository' },
  // Adapter Interface Components -- Presenters
  { name: 'configJSONPresenter', pathfile: '../../adapter/presenter/configJSONPresenter' },
  { name: 'configYAMLPresenter', pathfile: '../../adapter/presenter/configYAMLPresenter' },
  // Use Cases
  { name: 'getConfigUC', pathfile: '../../usecase/getConfigUC' },
  { name: 'loadConfigUC', pathfile: '../../usecase/loadConfigUC' },
];

exports.init = () => {
  arrayObj.forEach((x) => set(x));
};

exports.getLogger = () => exports.get('logger');

exports.getConfig = () => configStore;

exports.setConfig = (data) => {
  configStore = data;
};
