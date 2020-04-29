// configController.js

const container = require('../../container/container');

exports.getConfig = async (req, res) => {
  const configAdapterController = container.getConfigAdapterController();
  const repository = container.getMemConfigRepository();
  const presenter = container.getConfigJSONPresenter();
  const logger = container.getLogger();

  const result = await configAdapterController.getConfig(repository, presenter, logger);

  res.json(result);
};
