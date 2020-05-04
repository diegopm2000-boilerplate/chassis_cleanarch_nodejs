// getConfigController.test.js

/* global describe, it */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { expect } = require('chai');

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

// Expectations
const expectations = require('../../../../expectations/expectations');

// Main module tested
const getConfigController = rewire('../../../../../src/infrastructure/server/controller/getConfigController');

// Mocks
const containerMock = require('../../../../mock/infrastructure/container/container.mock');

getConfigController.__set__('container', containerMock);

describe('getConfigController - Infrastructure - Tests', () => {
  describe('execute - Successfully CASE', () => {
    it('it - Successfully CASE', async () => {
      // IN params
      const req = new MockExpressRequest();
      const res = new MockExpressResponse();
      // Expected Result
      const expectedResult = expectations.defaultObj;
      // Launch operation
      await getConfigController.execute(req, res);
      // Check
      expect(res._getJSON()).to.deep.equal(expectedResult); // eslint-disable-line no-underscore-dangle
    });
  });
});
