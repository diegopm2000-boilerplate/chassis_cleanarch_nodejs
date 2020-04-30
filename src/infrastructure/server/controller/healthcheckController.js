// healthcheckController.js

const container = require('../../container/container');

const MODULE_NAME = '[HealtchCheckController]';

exports.check = (req, res) => {
  container.getLogger().info(`${MODULE_NAME} (IN) --> no params`);

  const result = { message: 'OK' };

  container.getLogger().info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  res.json(result);
};
