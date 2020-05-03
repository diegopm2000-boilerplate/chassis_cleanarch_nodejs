// remoteConfigREpository.js

const axios = require('axios');
const YAML = require('yaml');

exports.getConfig = async (filename, endpoint) => {
  const innerResult = await axios.get(`${endpoint}/${filename}`);
  if (filename.endsWith('yml') || filename.endsWith('yaml')) {
    return YAML.parse(innerResult.data);
  }
  return innerResult.data;
};
