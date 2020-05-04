// consoleLogger.infra.test.js

/* global describe, it, before, after */

const { assert } = require('chai');
const sinon = require('sinon');

const consoleLogger = require('../../../../src/infrastructure/log/consoleLogger');

describe('ConsoleLogger Infra - Tests', () => {
  describe('defaultInit - Successfully CASE', () => {
    it('defaultInit - Successfully CASE', () => {
      // Launch Operation
      consoleLogger.defaultInit();
    });
  });
  describe('init - Successfully CASE', () => {
    it('init - Successfully CASE', () => {
      // Launch Operation
      consoleLogger.init();
    });
  });
  describe('debug - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.stub(console, 'debug');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('debug - Successfully CASE', () => {
      // Launch Operation
      consoleLogger.debug('message');
      // Check
      assert(mySpy.calledWith('message'));
    });
  });

  describe('info - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.stub(console, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('info - Successfully CASE', () => {
      // Launch Operation
      consoleLogger.info('message');
      // Check
      assert(mySpy.calledWith('message'));
    });
  });

  describe('error - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.stub(console, 'error');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });

    it('error - Successfully CASE', () => {
      // Launch Operation
      consoleLogger.error('message');
      // Check
      assert(mySpy.calledWith('message'));
    });
  });
});
