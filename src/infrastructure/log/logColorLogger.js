// logColorLogger.js

const Log = require('log-color');

let logger;

exports.defaultInit = () => {
  logger = new Log({ level: 'debug', color: true });
};

exports.init = (options) => {
  logger = new Log({ level: options.level, color: true });
};

exports.debug = (message) => {
  logger.debug(message);
};

exports.info = (message) => {
  logger.info(message);
};

exports.error = (message) => {
  logger.error(message);
};
