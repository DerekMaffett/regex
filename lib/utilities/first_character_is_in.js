var R = require('ramda');

function firstCharacterIsIn (set, testString) {
  if (R.contains(testString[0], set)) {
    return R.tail(testString);
  }

  return false;
};

module.exports = firstCharacterIsIn;
