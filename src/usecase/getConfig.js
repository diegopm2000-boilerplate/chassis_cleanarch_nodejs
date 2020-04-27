// getConfig.js UseCase

exports.execute = async (repository, presenter, logger, filename) => {
  logger.debug('config loaded from repository');
  const config = await repository.getConfig(filename);
  return presenter.present(config);
};
