var R = require('ramda');

function applyRegex(conditions, testString) {
  var remainder = testString;

  for (var condIndex = 0; condIndex < conditions.length; condIndex++) {
    var conditionResult = conditions[condIndex](remainder);

    if (conditionResult === false && remainder.length > 1) {
      return applyRegex(conditions, R.tail(testString));
    } else if (conditionResult === false && remainder.length <= 1) {
      return false;
    }

    remainder = conditionResult;
  }

  return true;
}

module.exports = applyRegex;
