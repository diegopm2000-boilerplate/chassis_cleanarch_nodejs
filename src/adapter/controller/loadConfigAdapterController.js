// loadConfigAdapterController.js

const container = require('../../infrastructure/container/container');

// eslint-disable-next-line arrow-body-style
exports.execute = (initialRepository, destinyRepository, presenter, logger, filename) => {
  return container.get('loadConfigUC').execute(initialRepository, destinyRepository, presenter, logger, filename);
};
