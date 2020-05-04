// memConfigRepository.test.js

/* global describe, it */

const { expect } = require('chai');

// Module tested
const memConfigRepository = require('../../../../src/infrastructure/repository/memConfigRepository');

describe('memConfigRepository - Infrastructure - Tests', () => {
  describe('get & setConfig - Successfully CASE', () => {
    it('get & setConfig - Successfully CASE', async () => {
      // Params IN
      const data = { a: 1, b: 2 };
      // Expected Result
      const expectedResult = true;
      const expectedConfigResult = data;
      // Launch Operations
      const result = await memConfigRepository.setConfig(data);
      expect(result).to.equal(expectedResult);
      const configResult = await memConfigRepository.getConfig();
      expect(configResult).to.equal(expectedConfigResult);
    });
  });
});
