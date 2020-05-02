// loadConfigAdapterController.js

const loadConfigConfigUC = require('../../usecase/loadConfig');

// eslint-disable-next-line arrow-body-style
exports.execute = (initialRepository, destinyRepository, presenter, logger, filename, refresh) => {
  return loadConfigConfigUC.execute(initialRepository, destinyRepository, presenter, logger, filename, refresh);
};
