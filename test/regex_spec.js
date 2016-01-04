var X = require('../lib');
var expect = require('chai').expect;

describe('regex', function () {
  it('should match strings', function () {
    var regex = X([
      X.literal('w'),
      X.literal('o'),
      X.literal('w')
    ], 'wow');

    expect(regex).to.eq(true);
  });

  it('should match extended strings', function () {
    var regex = X([
      X.literal('w'),
      X.literal('o'),
      X.literal('w')
    ], 'wow and how');

    expect(regex).to.eq(true);
  });

  it('should match extended strings that do not start with the match', function () {
    var regex = X([
      X.literal('w'),
      X.literal('o'),
      X.literal('w')
    ], 'stuff wow stuff');

    expect(regex).to.eq(true);
  });

  it('should not match incorrect strings', function () {
    var regex = X([
      X.literal('w'),
      X.literal('o'),
      X.literal('w')
    ], 'nope');

    expect(regex).to.eq(false);
  });
});
