import initialize from './initialize';
import { pipe } from './utils';

const applyRegex = (conditions, testString) => {
    const matches = pipe(conditions)(initialize(testString));

    return matches.map(({ startIndex, endIndex }) => ({
        index: startIndex,
        match: testString.slice(startIndex, endIndex)
    }));
}

export default applyRegex;
