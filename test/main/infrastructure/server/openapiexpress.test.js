// openapiexpress.test.js

/* global describe, it, before, after */
/* eslint-disable no-underscore-dangle */

const { expect } = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

// Main module tested
const openapiexpress = rewire('../../../../src/infrastructure/server/openapiexpress');

// Mocks
const containerMock = require('../../../mock/infrastructure/container/container.mock');
const securityMock = require('../../../mock/infrastructure/security/security.mock');

// Set the container Mock
openapiexpress.__set__('container', containerMock);
openapiexpress.__set__('security', securityMock);

const errorHandler = openapiexpress.__get__('errorHandler');
const routeNotFoundErrorHandler = openapiexpress.__get__('routeNotFoundErrorHandler');

const defaultTimeOut = 20; // timeout in miliseconds

describe('OpenApiExpress - Tests', () => {
  describe('OpenApiExpress - start Successfully CASE', () => {
    it('OpenApiExpress - start Successfully CASE', (done) => {
      // IN params
      const options = {
        port: 8090,
        apiDocument: './src/infrastructure/api/openapi.yaml',
        serverTimeout: '5s',
        enableCors: true,
      };
      // Expected result
      const expectedResult = true;

      // Launch operation
      openapiexpress.start(options)
        .then((result) => {
          // Check
          expect(result).to.equal(expectedResult);
          // Calling Stop Server
          setTimeout(() => {
            openapiexpress.stop();
            done();
          }, defaultTimeOut);
        });
    });
  });
  describe('OpenApiExpress - start with default port Successfully CASE', () => {
    it('OpenApiExpress - start with default port Successfully CASE', (done) => {
      // IN params
      const options = {
        apiDocument: './src/infrastructure/api/openapi.yaml',
        serverTimeout: '5s',
        enableCors: true,
      };
      // Expected result
      const expectedResult = true;

      // Launch operation
      openapiexpress.start(options)
        .then((result) => {
          // Check
          expect(result).to.equal(expectedResult);
          // Calling Stop Server
          setTimeout(() => {
            openapiexpress.stop();
            done();
          }, defaultTimeOut);
        });
    });
  });
  describe('OpenApiExpress - start with default serverTimeout Successfully CASE', () => {
    it('OpenApiExpress - start with default serverTimeout Successfully CASE', (done) => {
      // IN params
      const options = {
        port: 8090,
        apiDocument: './src/infrastructure/api/openapi.yaml',
        enableCors: true,
      };
      // Expected result
      const expectedResult = true;

      // Launch operation
      openapiexpress.start(options)
        .then((result) => {
          // Check
          expect(result).to.equal(expectedResult);
          // Calling Stop Server
          setTimeout(() => {
            openapiexpress.stop();
            done();
          }, defaultTimeOut);
        });
    });
  });
  describe('OpenApiExpress - start with disabled CORS Successfully CASE', () => {
    it('OpenApiExpress - start with disabled CORS Successfully CASE', (done) => {
      // IN params
      const options = {
        port: 8090,
        apiDocument: './src/infrastructure/api/openapi.yaml',
        serverTimeout: '5s',
        enableCors: false,
      };
      // Expected result
      const expectedResult = true;

      // Launch operation
      openapiexpress.start(options)
        .then((result) => {
          // Check
          expect(result).to.equal(expectedResult);
          // Calling Stop Server
          setTimeout(() => {
            openapiexpress.stop();
            done();
          }, defaultTimeOut);
        });
    });
  });
  describe('OpenApiExpress - start Throw Error CASE', () => {
    let myStub;

    before((done) => {
      myStub = sinon.stub(containerMock.getLogger(), 'info').throws(new Error('Error forced in testing'));
      done();
    });

    after((done) => {
      myStub.restore();
      done();
    });
    it('OpenApiExpress - start Throw Error CASE', async () => {
      // IN params
      const options = {
        port: 8090,
        apiDocument: './src/infrastructure/api/openapi.yaml',
        serverTimeout: '5s',
      };
      // Expected result
      const expectedErrorMessage = 'Express did not start correctly!';

      try {
        openapiexpress.start(options);
      } catch (error) {
        expect(error.message).to.equal(expectedErrorMessage);
      }
    });
  });
  describe('errorHandler - Successfully CASE', () => {
    it('errorHandler - Successfully CASE', () => {
      // IN params
      const err = {
        status: 500,
        stack: 'stack created for testing...',
        message: 'Internal Error',
      };
      const req = new MockExpressRequest();
      const res = new MockExpressResponse();
      // Expected Result
      const expectedResult = { code: 500, message: 'Internal Error' };
      // Launch operation
      errorHandler(err, req, res);
      // Check
      expect(res._getJSON()).to.deep.equal(expectedResult); // eslint-disable-line no-underscore-dangle
    });
  });
  describe('errorHandler - no status passed Successfully CASE', () => {
    it('errorHandler - no status passed Successfully CASE', () => {
      // IN params
      const err = {
        stack: 'stack created for testing...',
        message: 'Internal Error',
      };
      const req = new MockExpressRequest();
      const res = new MockExpressResponse();
      // Expected Result
      const expectedResult = { code: 500, message: 'Internal Error' };
      // Launch operation
      errorHandler(err, req, res);
      // Check
      expect(res._getJSON()).to.deep.equal(expectedResult); // eslint-disable-line no-underscore-dangle
    });
  });
  describe('routeNotFoundErrorHandler - Successfully CASE', () => {
    it('routeNotFoundErrorHandler - Successfully CASE', () => {
      // IN params
      const req = new MockExpressRequest({ method: 'GET', url: '/api/nonsense' });
      const res = new MockExpressResponse();
      // Expected Result
      const expectedResult = { code: 404, message: 'Cannot GET /api/nonsense' };
      // Launch operation
      routeNotFoundErrorHandler(req, res);
      // Check
      expect(res._getJSON()).to.deep.equal(expectedResult); // eslint-disable-line no-underscore-dangle
    });
  });
});
