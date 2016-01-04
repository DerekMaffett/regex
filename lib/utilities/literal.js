var R = require('ramda');

var firstCharacterIsIn = require('./first_character_is_in');

function literal(character, testString) {
  return firstCharacterIsIn([character], testString);
}

module.exports = R.curry(literal);
