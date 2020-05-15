// app.test.js

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

/* global describe, it, before, after */

const { expect } = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');

// Main module tested
const app = rewire('../../../../src/application/openapiexpress-app/app');

const expectations = require('../../../expectations/expectations');

const openapiexpressMock = require('../../../mock/infrastructure/server/openapiexpress.mock');

// Set the apiserver mock
app.__set__('apiserver', openapiexpressMock);

// Access to private methods
const loadEnvVars = app.__get__('loadEnvVars');
const initConfig = app.__get__('initConfig');

// Mocks
const containerMock = require('../../../mock/infrastructure/container/container.mock');

app.__set__('container', containerMock);

describe('App - Tests', () => {
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
  describe('initConfig - CASE', () => {
    describe('initConfig - Successfully fileConfigRepository CASE', () => {
      it('initConfig - Successfully fileConfigRepository CASE', async () => {
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
        const expectedResult = expectations.config;
        // Launch
        const result = await initConfig(envVars, logger);
        // Check
        expect(result).to.equal(expectedResult);
      });
    });
    describe('initConfig - Successfully remoteConfigRepository CASE', () => {
      it('initConfig - Successfully remoteConfigRepository CASE', async () => {
        // Params IN
        const envVars = {
          configSource: 'GIT',
          configFileName: 'openapi.yaml',
          configPort: '8080',
          apiDoc: 'chassis-dev.json',
          configSpringCfg: 'http://localhost:8888',
        };
        const logger = containerMock.getLogger();
        // Expected Result
        const expectedResult = expectations.config;
        // Launch
        const result = await initConfig(envVars, logger);
        // Check
        expect(result).to.equal(expectedResult);
      });
    });
    describe('initConfig - Config Source Not Valid CASE', () => {
      it('initConfig - Config Source Not Valid CASE', async () => {
        // Params IN
        const envVars = {
          configSource: 'NOT_VALID',
          configFileName: 'openapi.yaml',
          configPort: '8080',
          apiDoc: 'chassis-dev.json',
          configSpringCfg: 'NONE',
        };
        const logger = containerMock.getLogger();
        // Expected Result
        const expectedErrorMessage = 'Config Source not valid';
        try {
          // Launch
          await initConfig(envVars, logger);
        } catch (error) {
          // Check
          expect(error.message).to.equal(expectedErrorMessage);
        }
      });
    });
  });
  describe('init - CASE', () => {
    describe('init - Successfully CASE', () => {
      it('init - Successfully CASE', async () => {
        // Expected Result
        const expectedResult = true;
        // Launch
        const result = await app.init();
        // Check
        expect(result).to.equal(expectedResult);
      });
    });
    describe('init - Throw Error CASE', () => {
      let myStub;

      before((done) => {
        myStub = sinon.stub(containerMock.getLogger(), 'debug').throws(new Error('Error forced in testing'));
        done();
      });

      after((done) => {
        myStub.restore();
        done();
      });
      it('init - Throw Error CASE', async () => {
        // Expected Result
        const expectedErrorMessage = 'Error forced in testing';
        try {
          // Launch
          const result = await app.init();
        } catch (error) {
          // Check
          expect(error.message).to.equal(expectedErrorMessage);
        }
      });
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
