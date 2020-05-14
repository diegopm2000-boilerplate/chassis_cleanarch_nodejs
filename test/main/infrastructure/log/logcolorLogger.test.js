// logcolorLogger.infra.test.js

/* global describe, it, before, after */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { assert } = require('chai');
const sinon = require('sinon');

const LogColorMock = require('../../../mock/external/LogColor.mock');

const logColorLogger = rewire('../../../../src/infrastructure/log/logColorLogger');

logColorLogger.__set__('Log', LogColorMock);

describe('LogColor Logger Infra - Tests', () => {
  describe('defaultInit - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogColorMock, 'spyConstructor');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });
    it('defaultInit - Successfully CASE', () => {
      // Expected Options inner call
      const expectedOptionsInnerCall = { level: 'debug', color: true };
      // Launch op
      logColorLogger.defaultInit();
      // Check
      assert(mySpy.calledWith(expectedOptionsInnerCall));
    });
  });
  describe('init - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogColorMock, 'spyConstructor');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });
    it('init - Successfully CASE', () => {
      // In params
      const options = {
        level: 'info',
      };
      // Expected Options in call
      const expectedOptionsInnerCall = { level: options.level, color: true };
      // Launch op
      logColorLogger.init(options);
      // Check
      assert(mySpy.calledWith(expectedOptionsInnerCall));
    });
  });
  describe('debug - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogColorMock.prototype, 'debug');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });
    it('debug - Successfully CASE', () => {
      // In params
      const message = 'test message';
      // Expected Options in call
      const expectedOptionsInnerCall = message;
      // Launch op
      logColorLogger.debug(message);
      // Check
      assert(mySpy.calledWith(expectedOptionsInnerCall));
    });
  });
  describe('info - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogColorMock.prototype, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });
    it('info - Successfully CASE', () => {
      // In params
      const message = 'test message';
      // Expected Options in call
      const expectedOptionsInnerCall = message;
      // Launch op
      logColorLogger.info(message);
      // Check
      assert(mySpy.calledWith(` ${expectedOptionsInnerCall}`));
    });
  });
  describe('info - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogColorMock.prototype, 'info');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });
    it('info - Successfully CASE', () => {
      // In params
      const message = 'test message';
      // Expected Options in call
      const expectedOptionsInnerCall = message;
      // Launch op
      logColorLogger.info(message);
      // Check
      assert(mySpy.calledWith(` ${expectedOptionsInnerCall}`));
    });
  });
  describe('warning - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogColorMock.prototype, 'warning');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });
    it('warning - Successfully CASE', () => {
      // In params
      const message = 'test message';
      // Expected Options in call
      const expectedOptionsInnerCall = message;
      // Launch op
      logColorLogger.warning(message);
      // Check
      assert(mySpy.calledWith(`${expectedOptionsInnerCall}`));
    });
  });
  describe('error - Successfully CASE', () => {
    let mySpy;

    before((done) => {
      mySpy = sinon.spy(LogColorMock.prototype, 'error');
      done();
    });

    after((done) => {
      mySpy.restore();
      done();
    });
    it('error - Successfully CASE', () => {
      // In params
      const message = 'test message';
      // Expected Options in call
      const expectedOptionsInnerCall = message;
      // Launch op
      logColorLogger.error(message);
      // Check
      assert(mySpy.calledWith(expectedOptionsInnerCall));
    });
  });
});
