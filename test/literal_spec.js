var X = require('../lib');
var expect = require('chai').expect;

describe('literal', function () {
  it('should match the exact character', function () {
    var regex = X([
      X.literal('b')
    ], 'b');

    expect(regex).to.eq(true);
  });

  it('should not match anything else', function () {
    var regex = X([
      X.literal('c')
    ], 'b');

    expect(regex).to.eq(false);
  });
});
