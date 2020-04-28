// healthcheckController.js

let logger;

exports.init = (loggerIN) => {
  logger = loggerIN;
};

exports.check = (req, res) => {
  logger.info('Application is running OK!');
  res.json({ message: 'OK' });
};
