const INTEGERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const pipe = (funcs) => (init) => funcs.reduce((accum, func) => func(accum), init);
const take = (numToTake) => (string) => string.slice(0, numToTake);
const getPath = (pathObj) => pathObj.path;
const equals = (comparisonVal) => (value) => value === comparisonVal;
const isInteger = (string) => !!INTEGERS.find(equals(string));
const consume = (numToConsume) => (pathObj) => ({
    startIndex: pathObj.startIndex,
    endIndex: pathObj.endIndex + numToConsume,
    path: pathObj.path.slice(numToConsume)
})

export const literal = (character) => {
    return (paths) => {
        if (character === '') { return paths; }

        return paths.filter(pipe([getPath, take(1), equals(character)]))
            .map(consume(1));
    };
};

export const anchorStart = (paths, testString) => {
    return paths.filter((pathObj) => pathObj.path === testString);
};

export const anchorEnd = (paths) => {
    return paths.filter((pathObj) => pathObj.path === '');
};

export const integer = (paths) => {
    return paths.filter(pipe([getPath, take(1), isInteger])).map(consume(1));
};
