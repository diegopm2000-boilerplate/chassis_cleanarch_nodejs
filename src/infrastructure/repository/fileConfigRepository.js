// fileConfigRepository.js

const readFilePromise = require('fs-readfile-promise');
const YAML = require('yaml');

const CONFIG_BASEPATH = './config';

exports.getConfig = async (filename) => {
  const buffer = await readFilePromise(`${CONFIG_BASEPATH}/${filename}`);

  if (filename.endsWith('yml') || filename.endsWith('yaml')) {
    return YAML.parse(buffer.toString());
  }

  return JSON.parse(buffer.toString()); // we assume it is a json file
};
