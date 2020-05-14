// memConfigRepository.js

// TODO se está usando este memConfigRepository ???

let config = {};

exports.getConfig = () => new Promise((resolve) => {
  resolve(config);
});

exports.setConfig = async (data) => new Promise((resolve) => {
  config = data;
  resolve(true);
});
