// getCachedConfig.js

/* eslint-disable no-console */

exports.execute = async (cacheRepository, initialRepository, presenter, filename, refresh) => {
  let config;
  if (refresh) {
    console.log('config loaded from initialRepository');
    config = await initialRepository.getConfig(filename);
    // Refresh the config in cache
    await cacheRepository.setConfig(config);
  } else {
    console.log('config loaded from cacheRepository');
    config = await cacheRepository.getConfig(filename);
  }

  return presenter.present(config);
};
