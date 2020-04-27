// getCachedConfig.js

exports.execute = async (cacheRepository, initialRepository, presenter, logger, filename, refresh) => {
  let config;
  if (refresh) {
    logger.debug('config loaded from initialRepository');
    config = await initialRepository.getConfig(filename);
    // Refresh the config in cache
    await cacheRepository.setConfig(config);
  } else {
    logger.debug('config loaded from cacheRepository');
    config = await cacheRepository.getConfig(filename);
  }

  return presenter.present(config);
};
