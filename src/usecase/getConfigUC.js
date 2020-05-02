// getConfig.js UseCase

const MODULE_NAME = '[getConfig UC]';

exports.execute = async (repository, presenter, logger, filename) => {
  logger.info(`${MODULE_NAME} (IN) --> filename: ${filename}`);

  const config = await repository.getConfig(filename);

  logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(config)}`);
  return presenter.present(config);
};
