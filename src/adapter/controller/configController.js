// configController.js

const getConfigUC = require('../../usecase/getConfig');
const getCachedConfigUC = require('../../usecase/getCachedConfig');

exports.getConfig = (repository, presenter, logger, filename) => getConfigUC.execute(repository, presenter, logger, filename);

// eslint-disable-next-line arrow-body-style
exports.getCachedConfig = (cacheRepository, initialRepository, presenter, logger, filename, refresh) => {
  return getCachedConfigUC.execute(cacheRepository, initialRepository, presenter, logger, filename, refresh);
};
