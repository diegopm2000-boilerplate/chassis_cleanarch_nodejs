// fileConfigRepository.js

const readFilePromise = require('fs-readfile-promise');
const YAML = require('yaml');

const CONFIG_BASEPATH = './config';

exports.getConfig = async (filename) => {
  const buffer = await readFilePromise(`${CONFIG_BASEPATH}/${filename}`);
  console.log(`--> inner buffer: ${buffer}, typeof: ${typeof buffer}, filename: ${filename}`);

  if (filename.endsWith('yml') || filename.endsWith('yaml')) {
    console.log('Nos vamos por el yaml');
    return YAML.parse(buffer.toString());
  }
  console.log(`--> inner result: ${buffer.toString()}`);

  return JSON.parse(buffer.toString()); // we assume it is a json file
};
