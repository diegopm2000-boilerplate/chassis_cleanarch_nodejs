// cachedConfigAdapterController.js

const getCachedConfigUC = require('../../usecase/getCachedConfig');

// eslint-disable-next-line arrow-body-style
exports.getCachedConfig = (cacheRepository, initialRepository, presenter, logger, filename, refresh) => {
  return getCachedConfigUC.execute(cacheRepository, initialRepository, presenter, logger, filename, refresh);
};
