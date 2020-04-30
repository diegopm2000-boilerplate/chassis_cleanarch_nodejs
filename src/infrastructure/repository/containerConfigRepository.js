// containerConfigRepository.js

const container = require('../container/container');

exports.getConfig = () => new Promise((resolve) => {
  resolve(container.getConfig());
});

exports.setConfig = async (data) => new Promise((resolve) => {
  container.setConfig(data);
  resolve(true);
});
