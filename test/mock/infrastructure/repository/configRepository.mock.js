// configRepository.mock.js

/* eslint-disable no-unused-vars */

const expectations = require('../../../expectations/expectations');

exports.getConfig = () => new Promise((resolve) => {
  resolve(expectations.config);
});

exports.setConfig = async (data) => new Promise((resolve) => {
  resolve(true);
});
