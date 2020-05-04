// containerConfig.Repository.test.js

/* global describe, it */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { expect } = require('chai');

// Expectations
const expectations = require('../../../expectations/expectations');

// Module tested
const containerConfigRepository = rewire('../../../../src/infrastructure/repository/containerConfigRepository');

describe('containerConfigRepository - Infrastructure - Tests', () => {
  describe('getConfig & setConfig - Successfully CASE', () => {
    it('getConfig & setConfig - Successfully CASE', async () => {
      // Params IN
      const data = expectations.defaultObj;
      // Expected Result
      const expectedResult = true;
      const expectedConfigResult = data;
      // Launch Operations
      const result = await containerConfigRepository.setConfig(data);
      expect(result).to.equal(expectedResult);
      const configResult = await containerConfigRepository.getConfig();
      expect(configResult).to.equal(expectedConfigResult);
    });
  });
});
