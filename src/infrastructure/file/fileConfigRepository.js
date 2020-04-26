// fileConfigRepository.js

const readYaml = require('read-yaml-promise');

const CONFIG_BASEPATH = './config';

exports.getConfig = (filename) => readYaml(`${CONFIG_BASEPATH}/${filename}`, 'utf8');
