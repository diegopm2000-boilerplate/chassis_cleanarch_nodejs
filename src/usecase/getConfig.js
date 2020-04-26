// getConfig.js UseCase

exports.execute = async (repository, presenter, filename) => {
  const config = await repository.getConfig(filename);
  return presenter.present(config);
};
