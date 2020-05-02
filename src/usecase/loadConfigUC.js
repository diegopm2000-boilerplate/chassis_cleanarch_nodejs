// loadConfig.js

const MODULE_NAME = '[loadConfig UC]';

exports.execute = async (initialRepository, destinyRepository, presenter, logger, filename) => {
  logger.info(`${MODULE_NAME} (IN) --> filename: ${filename}}`);

  logger.debug(`${MODULE_NAME} (MID) --> config loaded from initial Repository`);
  const config = await initialRepository.getConfig(filename);
  await destinyRepository.setConfig(config);
  logger.debug(`${MODULE_NAME} (MID) --> config stored in destiny Repository`);

  logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(config)}`);
  return presenter.present(config);
};
