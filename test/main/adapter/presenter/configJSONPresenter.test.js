// configJSONPresenter.test.js

/* global describe, it */

const { expect } = require('chai');

// Main module tested
const configJSONPresenter = require('../../../../src/adapter/presenter/configJSONPresenter');

describe('configJSONPresenter - Tests', () => {
  describe('present - Successfully CASE', () => {
    it('present - Successfully CASE', async () => {
      // Params IN
      const obj = { a: 1, b: 2 };
      // Expected Result
      const expectedResult = obj;
      // Launch operation
      const result = await configJSONPresenter.present(obj);
      // Check
      expect(result).to.deep.equal(expectedResult);
    });
  });
});
