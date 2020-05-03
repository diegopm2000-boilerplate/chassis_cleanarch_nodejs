// getConfigUC.test.js

/* global describe, it */

const { expect } = require('chai');

// Main module tested
const getConfigUC = require('../../../src/usecase/getConfigUC');

// Mocks
const repository = require('../../mock/infrastructure/repository/configRepository.mock');
const logger = require('../../mock/infrastructure/log/logger.mock');
const presenter = require('../../mock/adapter/presenter/presenter.mock');

describe('getConfigUC - Tests', () => {
  describe('execute - Successfully CASE', () => {
    it('execute - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfilename.yml';
      // Expected Result
      const expectedResult = {};
      // Launch operation
      const result = await getConfigUC.execute(repository, presenter, logger, filename);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
