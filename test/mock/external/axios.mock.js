// axios.mock.js

/* eslint-disable no-unused-vars */

function axios(options) {
  return new Promise((resolve, reject) => {
    if (options.fail === 'true') {
      reject(new Error('Error Axios'));
    }
    resolve({ data: 'OK' });
  });
}

module.exports = axios;
