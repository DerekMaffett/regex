import initialize from './initialize';

const applyRegex = (conditions, testString) => {
    const matches = conditions.reduce((possiblePaths, cond) => {
        return cond(possiblePaths, testString);
    }, initialize(testString));

    return matches.map(({ startIndex, endIndex }) => ({
        index: startIndex,
        match: testString.slice(startIndex, endIndex)
    }));
}

export default applyRegex;
