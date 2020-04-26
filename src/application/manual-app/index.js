// index.js

/* eslint-disable no-console */

const fileConfigRepository = require('../../infrastructure/file/fileConfigRepository');
const memConfigRepository = require('../../infrastructure/memory/memConfigRepository');

const configController = require('../../adapter/controller/configController');

const configJSONPresenter = require('../../adapter/presenter/configJSONPresenter');
const configYAMLPresenter = require('../../adapter/presenter/configYAMLPresenter');

function getConfigInJSON() {
  return configController.getConfig(fileConfigRepository, configJSONPresenter, 'chassis.yml');
}

function getConfigInYAML() {
  return configController.getConfig(fileConfigRepository, configYAMLPresenter, 'chassis.yml');
}

function getCachedConfig() {
  return configController.getCachedConfig(memConfigRepository, fileConfigRepository, configYAMLPresenter, 'chassis.yml');
}

function getCachedConfigWithRefresh() {
  return configController.getCachedConfig(memConfigRepository, fileConfigRepository, configYAMLPresenter, 'chassis.yml', true);
}

(async () => {
  let result;
  result = await getConfigInJSON();
  console.log(result);
  result = await getConfigInYAML();
  console.log(result);

  result = await getCachedConfig();
  console.log(result);
  result = await getCachedConfigWithRefresh();
  console.log(result);
  result = await getCachedConfig();
  console.log(result);
})();
