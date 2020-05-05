// readFilePromise.mock.js

/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const expectations = require('../../expectations/expectations');

module.exports = function (pathfile) {
  return new Promise((resolve) => {
    if (pathfile.endsWith('yml') || pathfile.endsWith('yaml')) {
      resolve(expectations.defaultYAMLBuffer);
    } else if (pathfile.endsWith('json')) {
      resolve(expectations.defaultObjBuffer);
    } else {
      resolve(expectations.defaultBuffer);
    }
  });
};
