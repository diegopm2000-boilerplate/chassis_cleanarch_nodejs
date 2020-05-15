// getConfigUC.mock.js

/* eslint-disable no-unused-vars */

const expectations = require('../../expectations/expectations');

exports.execute = (repository, presenter, logger, filename) => new Promise((resolve) => {
  resolve(expectations.config);
});
