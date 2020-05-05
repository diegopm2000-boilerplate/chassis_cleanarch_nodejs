// loadConfigAdapterController.mock.js

/* eslint-disable no-unused-vars */

const expectations = require('../../../expectations/expectations');

exports.execute = (initialRepository, destinyRepository, presenter, logger, filename, endpoint) => {
  return new Promise((resolve) => {
    resolve(expectations.defaultObj);
  });
};
