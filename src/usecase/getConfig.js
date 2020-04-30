// getConfig.js UseCase

const MODULE_NAME = '[getConfig UC]';

exports.execute = async (repository, presenter, logger, filename) => {
  logger.info(`>>>> ${MODULE_NAME} filename: ${filename}`);

  const config = await repository.getConfig(filename);

  logger.info(`<<<< ${MODULE_NAME} result: ${JSON.stringify(config)}`);
  return presenter.present(config);
};
