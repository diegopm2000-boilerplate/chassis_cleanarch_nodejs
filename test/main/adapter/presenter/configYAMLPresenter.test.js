// configYAMLPresenter.test.js

/* global describe, it */

const { expect } = require('chai');

const YAML = require('yamljs');

// Main module tested
const configYAMLPresenter = require('../../../../src/adapter/presenter/configYAMLPresenter');

describe('configYAMLPresenter - Tests', () => {
  describe('present - Successfully CASE', () => {
    it('present - Successfully CASE', async () => {
      // Params IN
      const obj = { a: 1, b: 2 };
      // Expected Result
      const expectedResult = YAML.stringify(obj);
      // Launch operation
      const result = await configYAMLPresenter.present(obj);
      // Check
      expect(result).to.equal(expectedResult);
    });
  });
});
