// configController.js

const getConfigUC = require('../../usecase/getConfig');
const getCachedConfigUC = require('../../usecase/getCachedConfig');

exports.getConfig = (repository, presenter, filename) => getConfigUC.execute(repository, presenter, filename);

// eslint-disable-next-line arrow-body-style
exports.getCachedConfig = (cacheRepository, initialRepository, presenter, filename, refresh) => {
  return getCachedConfigUC.execute(cacheRepository, initialRepository, presenter, filename, refresh);
};
