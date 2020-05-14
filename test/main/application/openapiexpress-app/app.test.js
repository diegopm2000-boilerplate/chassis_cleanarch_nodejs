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
const initConfig = app.__get__('initConfig');

// Mocks
const containerMock = require('../../../mock/infrastructure/container/container.mock');

app.__set__('container', containerMock);

describe('App OpenApiExpress - Tests', () => {
  describe('loadEnvVars - Successfully CASE', () => {
    it('loadEnvVars - Successfully CASE', () => {
      // Params IN
      process.env.NODE_CONFIG_SOURCE_APP = 'YAML_FILE';
      process.env.NODE_CONFIG_FILE = 'openapi.yaml';
      process.env.NODE_CONFIG_PORT_APP = '8080';
      process.env.NODE_CONFIG_APIFILE = 'chassis-dev.json';
      process.env.NODE_CONFIG_SPRINGCFG_ENDPOINT = 'NONE';
      // Expected Result
      const expectedResult = {
        configSource: 'YAML_FILE',
        configFileName: 'openapi.yaml',
        configPort: '8080',
        apiDoc: 'chassis-dev.json',
        configSpringCfg: 'NONE',
      };
      // Launch
      const result = loadEnvVars();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('initConfig - Successfully CASE', () => {
    it('initConfig - Successfully CASE', async () => {
      // Params IN
      const envVars = {
        configSource: 'YAML_FILE',
        configFileName: 'openapi.yaml',
        configPort: '8080',
        apiDoc: 'chassis-dev.json',
        configSpringCfg: 'NONE',
      };
      const logger = containerMock.getLogger();
      // Expected Result
      const expectedResult = true;
      // Launch
      const result = await initConfig(envVars, logger);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });
  describe('unhandledRejection Event - Tests', () => {
    it('unhandledRejection Event - Successfully CASE', (done) => {
      process.emit('unhandledRejection');
      setTimeout(() => {
        done();
      }, 200);
    });
  });
});
