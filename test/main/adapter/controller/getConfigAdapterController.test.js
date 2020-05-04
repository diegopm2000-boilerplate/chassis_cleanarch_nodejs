// getConfigAdapterController.test.js

/* global describe, it */

const { expect } = require('chai');

// Main module tested
const getConfigAdapterController = require('../../../../src/adapter/controller/getConfigAdapterController');

// Mocks
const initialRepository = require('../../../mock/infrastructure/repository/configRepository.mock');
const logger = require('../../../mock/infrastructure/log/logger.mock');
const presenter = require('../../../mock/adapter/presenter/presenter.mock');

describe('getConfigAdapterController - Tests', () => {
  describe('execute - Successfully CASE', () => {
    it('execute - Successfully CASE', async () => {
      // Params IN
      const filename = 'myfilename.yml';
      const repository = initialRepository;

      // Expected Result
      const expectedResult = {};
      // Launch operation
      const result = await getConfigAdapterController.execute(repository, presenter, logger, filename);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
