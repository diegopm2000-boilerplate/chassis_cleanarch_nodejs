// healthcheckController.test.js

/* global describe, it */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { expect } = require('chai');

const MockExpressRequest = require('mock-express-request');
const MockExpressResponse = require('mock-express-response');

const healtchcheckController = rewire('../../../../../src/infrastructure/server/controller/healthcheckController');

const containerMock = require('../../../../mock/infrastructure/container/container.mock');

healtchcheckController.__set__('container', containerMock);

describe('healtchcheckController - Infrastructure - Tests', () => {
  describe('execute - Successfully CASE', () => {
    it('it - Successfully CASE', async () => {
      // IN params
      const req = new MockExpressRequest();
      const res = new MockExpressResponse();
      // Expected Result
      const expectedResult = { message: 'OK' };
      // Launch operation
      await healtchcheckController.execute(req, res);
      // Check
      expect(res._getJSON()).to.deep.equal(expectedResult); // eslint-disable-line no-underscore-dangle
    });
  });
});
