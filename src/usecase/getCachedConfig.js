// getCachedConfig.js

const MODULE_NAME = '[getCachedConfig UC]';

exports.execute = async (cacheRepository, initialRepository, presenter, logger, filename, refresh) => {
  logger.info(`${MODULE_NAME} (IN) --> filename: ${filename}, refresh: ${refresh}`);

  let config;
  if (refresh) {
    logger.debug(`${MODULE_NAME} (MID) --> config loaded from initialRepository`);
    config = await initialRepository.getConfig(filename);
    // Refresh the config in cache
    await cacheRepository.setConfig(config);
    logger.debug(`${MODULE_NAME} (MID) --> config cacheRepository refreshed OK!`);
  } else {
    logger.debug(`${MODULE_NAME} (MID) --> config loaded from cacheRepository`);
    config = await cacheRepository.getConfig(filename);
  }

  logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(config)}`);
  return presenter.present(config);
};
