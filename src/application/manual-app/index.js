// index.js

/* eslint-disable no-console */

const fileConfigRepository = require('../../infrastructure/file/fileConfigRepository');

const configController = require('../../adapter/controller/configController');

const configJSONPresenter = require('../../adapter/presenter/configJSONPresenter');
const configYAMLPresenter = require('../../adapter/presenter/configYAMLPresenter');

function getConfigInJSON() {
  return configController.getConfig(fileConfigRepository, configJSONPresenter, 'chassis.yml');
}

function getConfigInYAML() {
  return configController.getConfig(fileConfigRepository, configYAMLPresenter, 'chassis.yml');
}

(async () => {
  const configInJSON = await getConfigInJSON();
  console.log(configInJSON);
  const configInYAML = await getConfigInYAML();
  console.log(configInYAML);
})();
