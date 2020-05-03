// configRepository.mock.js

/* eslint-disable no-unused-vars */

exports.getConfig = () => new Promise((resolve) => {
  resolve({ });
});

exports.setConfig = async (data) => new Promise((resolve) => {
  resolve(true);
});
