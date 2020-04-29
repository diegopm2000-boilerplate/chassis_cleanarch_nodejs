// healthcheckController.js

const container = require('../../container/container');

exports.check = (req, res) => {
  container.getLogger().info('Application is running OK!');
  res.json({ message: 'OK' });
};
