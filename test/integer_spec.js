var X = require('../lib');
var expect = require('chai').expect;

describe('integer', function () {
  it('should match integers', function () {
    var regex = X([
      X.integer
    ], '4');

    expect(regex).to.eq(true);
  });

  it('should not match letters', function () {
    var regex = X([
      X.integer
    ], 'k');

    expect(regex).to.eq(false);
  });

  it('should not match spaces', function () {
    var regex = X([
      X.integer
    ], ' ');

    expect(regex).to.eq(false);
  });
});
