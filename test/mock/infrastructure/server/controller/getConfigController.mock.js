// getConfigController.mock.js

/* eslint-disable no-unused-vars */

const expectations = require('../../../../expectations/expectations');

exports.execute = async (req, res) => new Promise((resolve) => {
  resolve(expectations.config);
});
