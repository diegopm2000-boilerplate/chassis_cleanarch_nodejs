// security.test.js

/* global describe, it, before, after */
/* eslint-disable no-underscore-dangle */

const rewire = require('rewire');
const { assert } = require('chai');
const sinon = require('sinon');

// Main module tested
const security = rewire('../../../../src/infrastructure/security/security');

// Mocks used
const containerMock = require('../../../mock/infrastructure/container/container.mock');
const expressAppMock = require('../../../mock/external/ExpressApp.mock');

security.__set__('container', containerMock);

describe('Security Helper - Tests', () => {
  describe('init - Successfully', () => {
    describe('init - Without HSTS CASE', () => {
      let mySpy;

      before((done) => {
        mySpy = sinon.spy(expressAppMock, 'use');
        done();
      });

      after((done) => {
        mySpy.restore();
        done();
      });

      it('init - Without HSTS CASE', () => {
        // Launch Operation
        security.init(expressAppMock);
        // Check
        assert(mySpy.calledTwice);
      });
    });

    describe('init - With HSTS CASE', () => {
      let mySpy;

      before((done) => {
        mySpy = sinon.spy(expressAppMock, 'use');
        done();
      });

      after((done) => {
        mySpy.restore();
        done();
      });

      it('init - With HSTS CASE', () => {
        // Launch Operation
        security.init(expressAppMock, true);
        // Check
        assert(mySpy.calledThrice);
      });
    });
  });
});