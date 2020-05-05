// app.test.js

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

/* global describe, it */

const { expect } = require('chai');
const rewire = require('rewire');

// Main module tested
const app = rewire('../../../../src/application/openapiexpress-app/app');

// Access to private methods
const loadEnvVars = app.__get__('loadEnvVars');

describe('App Manual - Tests', () => {
  describe('loadEnvVars - Successfully CASE', () => {
    // Params IN
    process.env.NODE_CONFIG_SOURCE_APP = 'GIT';
    process.env.NODE_CONFIG_FILE = 'http://localhost:8888';
    process.env.NODE_CONFIG_PORT_APP = 'chassis-dev.json';
    process.env.NODE_CONFIG_APIFILE = '8080';
    process.env.NODE_CONFIG_SPRINGCFG_ENDPOINT = 'openapi.yaml';
    // Expected Result
    const expectedResult = {
      configSource: 'GIT',
      configFileName: 'http://localhost:8888',
      configPort: 'chassis-dev.json',
      apiDoc: '8080',
      configSpringCfg: 'openapi.yaml',
    };
    // Launch Result
    const result = loadEnvVars();
    // Check
    expect(result).to.deep.equal(expectedResult);
  });
  describe('initConfig - Successfully CASE', () => {

  });
  describe('loadEnvVars - Successfully CASE', () => {

  });
});
