var firstCharacterIsIn = require('./first_character_is_in');

var INTEGERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

function integer (testString) {
  return firstCharacterIsIn(INTEGERS, testString);
}

module.exports = integer;
