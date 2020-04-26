// configYAMLPresenter.js

const YAML = require('yamljs');

exports.present = (obj) => YAML.stringify(obj);
