// fileConfigRepository.test.js

/* global describe, it */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { expect } = require('chai');

// Expectations
const expectations = require('../../../expectations/expectations');

// Mocks
const readFilePromiseMock = require('../../../mock/external/readFilePromise.mock');

// Module tested
const fileConfigRepository = rewire('../../../../src/infrastructure/repository/fileConfigRepository');

fileConfigRepository.__set__('readFilePromise', readFilePromiseMock);

describe('fileConfigRepository - Infrastructure - Tests', () => {
  describe('getConfig - Successfully CASE', () => {
    it('getConfig - json file - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfileconfig.json';
      // Expected Result
      const expectedResult = JSON.parse(expectations.defaultObjBuffer.toString());
      // Launch Operations
      const result = await fileConfigRepository.getConfig(filename);
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('getConfig - yaml file - Successfully CASE', async () => {
    it('getConfig - yaml file - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfileconfig.yaml';
      // Expected Result
      const expectedResult = expectations.defaultObj;
      // Launch Operations
      const result = await fileConfigRepository.getConfig(filename);
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('getConfig - yml file - Successfully CASE', async () => {
    it('getConfig - yml file - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfileconfig.yml';
      // Expected Result
      const expectedResult = expectations.defaultObj;
      // Launch Operations
      const result = await fileConfigRepository.getConfig(filename);
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
