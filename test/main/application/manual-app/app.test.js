// app.test.js

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

/* global describe, it */

const { expect } = require('chai');
const rewire = require('rewire');
const sinon = require('sinon');

const expectations = require('../../../expectations/expectations');

// Main tested module
const app = rewire('../../../../src/application/manual-app/app');

// Mocks
const loadConfigAdapterControllerMock = require('../../../mock/adapter/controller/loadConfigAdapterController.mock');
const getConfigAdapterControllerMock = require('../../../mock/adapter/controller/getConfigAdapterController.mock');
const configJSONPresenterMock = require('../../../mock/adapter/presenter/presenter.mock');
const configYAMLPresenterMock = require('../../../mock/adapter/presenter/presenter.mock');

// Inject mocks into main module
app.__set__('loadConfigAdapterController', loadConfigAdapterControllerMock);
app.__set__('getConfigAdapterController', getConfigAdapterControllerMock);
app.__set__('configJSONPresenter', configJSONPresenterMock);
app.__set__('configYAMLPresenter', configYAMLPresenterMock);

// Access to private methods
const loadConfig = app.__get__('loadConfig');
const getConfigInJSON = app.__get__('getConfigInJSON');
const getConfigInYAML = app.__get__('getConfigInYAML');

describe('App Manual - Tests', () => {
  describe('loadConfig - Successfully CASE', () => {
    it('loadConfig - Successfully CASE', async () => {
      // Expectations
      const expectedResult = expectations.defaultObj;

      // Launch operation
      const result = await loadConfig();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('getConfigInJSON - Successfully CASE', () => {
    it('getConfigInJSON - Successfully CASE', async () => {
      // Expectations
      const expectedResult = expectations.defaultObj;

      // Launch operation
      const result = await getConfigInJSON();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
  describe('getConfigInYAML - Successfully CASE', () => {
    it('getConfigInYAML - Successfully CASE', async () => {
      // Expectations
      const expectedResult = expectations.defaultObj;

      // Launch operation
      const result = await getConfigInYAML();
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
