// openapiexpress.mock.js

/* eslint-disable no-unused-vars */

exports.start = async ({ port, apiDocument, serverTimeout }) => {
  return new Promise((resolve) => {
    console.log('Entramos en el openapiexpress.mock');
    resolve(true);
  });
};

exports.stop = () => {};
