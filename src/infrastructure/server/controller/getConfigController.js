// getConfigController.js

const container = require('../../container/container');

const MODULE_NAME = '[getConfigController]';

exports.execute = async (req, res) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> no params`);

  const getConfigUC = container.get('getConfigUC');
  const repository = container.get('containerConfigRepository');
  const presenter = container.get('configJSONPresenter');
  const logger = container.getLogger();

  const result = await getConfigUC.execute(repository, presenter, logger);

  container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  res.json(result);
};
