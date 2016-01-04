var R = require('ramda');

function literal(character, testString) {
  if (testString[0] === character) {
    return R.tail(testString);
  }

  return false;
}

module.exports = R.curry(literal);
