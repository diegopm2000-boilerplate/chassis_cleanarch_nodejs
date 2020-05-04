// remoteConfigRepository.test.js

/* global describe, it, before, after */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { expect } = require('chai');
const sinon = require('sinon');

// Mocks
const axiosMock = require('../../../mock/external/axios.mock');

// Expectations
const expectations = require('../../../expectations/expectations');

// Module tested
const remoteConfigRepository = rewire('../../../../src/infrastructure/repository/remoteConfigRepository');

remoteConfigRepository.__set__('axios', axiosMock);

describe('remoteConfigRepository - Infrastructure - Tests', () => {
  describe('getConfig - json file - Successfully CASE', () => {
    let myStub;
    let myUnset;
    before((done) => {
      myStub = sinon.stub().resolves({ data: expectations.defaultObj });
      myUnset = remoteConfigRepository.__set__('axios.get', myStub);
      done();
    });

    after((done) => {
      myUnset();
      done();
    });
    it('getConfig - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfileconfig.json';
      // Expected Result
      const expectedResult = JSON.parse(expectations.defaultObjBuffer.toString());
      // Launch Operations
      const result = await remoteConfigRepository.getConfig(filename);
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('getConfig - yaml file - Successfully CASE', () => {
    let myStub;
    let myUnset;
    before((done) => {
      myStub = sinon.stub().resolves({ data: expectations.defaultYAMLObj });
      myUnset = remoteConfigRepository.__set__('axios.get', myStub);
      done();
    });

    after((done) => {
      myUnset();
      done();
    });
    it('getConfig - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfileconfig.yaml';
      // Expected Result
      const expectedResult = JSON.parse(expectations.defaultObjBuffer.toString());
      // Launch Operations
      const result = await remoteConfigRepository.getConfig(filename);
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
