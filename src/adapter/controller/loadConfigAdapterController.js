// loadConfigAdapterController.js

const loadConfigUC = require('../../usecase/loadConfigUC');

// eslint-disable-next-line arrow-body-style
exports.execute = (initialRepository, destinyRepository, presenter, logger, filename) => {
  return loadConfigUC.execute(initialRepository, destinyRepository, presenter, logger, filename);
};
