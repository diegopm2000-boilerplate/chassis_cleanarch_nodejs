// loadConfigUC.mock.js

/* eslint-disable no-unused-vars */

const expectations = require('../../expectations/expectations');

exports.execute = (initialRepository, destinyRepository, presenter, logger, filename, endpoint) => new Promise((resolve) => {
  resolve(expectations.config);
});
