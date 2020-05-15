// expectations.js

const dedent = require('dedent');

exports.defaultObj = { a: 1, b: 2 };

exports.defaultYAMLObj = dedent`---
a: 1
b: 2`;

exports.defaultObjBuffer = Buffer.from(JSON.stringify({ a: 1, b: 2 }));

exports.defaultYAMLBuffer = Buffer.from(dedent`---
a: 1
b: 2`);

exports.defaultBuffer = Buffer.from('a:1 b:2');

exports.config = {
  app: {
    appName: 'Chassis - Clean Architecture - NodeJS',
    description: 'Chassis using Clean Architecture in NodeJS',
    environment: 'dev',
  },
  log: {
    level: 'debug',
  },
  express: {
    enableCors: false,
  },
};
