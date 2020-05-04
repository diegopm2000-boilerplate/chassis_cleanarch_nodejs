// readFilePromise.mock.js

/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

const expectations = require('../../expectations/expectations');

module.exports = function (pathfile) {
  return new Promise((resolve) => {
    console.log('Se llama al readFilePromise...');
    if (pathfile.endsWith('yml') || pathfile.endsWith('yaml')) {
      console.log('readFilePromiseMock yaml case');
      resolve(expectations.defaultYAMLBuffer);
    } else if (pathfile.endsWith('json')) {
      console.log('readFilePromiseMock json case');
      resolve(expectations.defaultObjBuffer);
    } else {
      console.log('readFilePromiseMock another case');
      resolve(expectations.defaultBuffer);
    }
  });
};
