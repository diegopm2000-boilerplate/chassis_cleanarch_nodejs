// loadConfigUC.test.js

/* global describe, it */

const { expect } = require('chai');

// Main module tested
const loadConfigUC = require('../../../src/usecase/loadConfigUC');

const expectations = require('../../expectations/expectations');

// Mocks
const initialRepository = require('../../mock/infrastructure/repository/configRepository.mock');
const logger = require('../../mock/infrastructure/log/logger.mock');
const presenter = require('../../mock/adapter/presenter/presenter.mock');

describe('loadConfigUC - Tests', () => {
  describe('execute - Successfully CASE', () => {
    it('execute - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfilename.yml';
      const destinyRepository = initialRepository;
      const endpoint = 'http://localhost:8888/myfilename.yml';
      // Expected Result
      const expectedResult = expectations.config;
      // Launch operation
      const result = await loadConfigUC.execute(initialRepository, destinyRepository, presenter, logger, filename, endpoint);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
