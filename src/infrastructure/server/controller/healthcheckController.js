// healthcheckController.js

const container = require('../../container/container');

const MODULE_NAME = '[HealtchCheckController]';

exports.execute = (req, res) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> no params`);

  const result = { message: 'OK' };

  container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  res.json(result);
};
