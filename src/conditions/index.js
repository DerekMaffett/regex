const INTEGERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const pipe = (funcs) => (init) => funcs.reduce((accum, func) => func(accum), init);
const take = (numToTake) => (string) => string.slice(0, numToTake);
const equals = (comparisonVal) => (value) => value === comparisonVal;
const isInteger = (string) => !!INTEGERS.find(equals(string));
const consume = (numToConsume) => (string) => string.slice(numToConsume);

export const beginAnywhere = (paths, testString) => {
    if (paths.length !== 1 || paths[0] !== testString) {
        throw new Error('beginAnywhere must be used as an initial function');
    }

    return Array(testString.length + 1).fill('').map((_item, i) => {
        return testString.slice(i);
    });
};

export const literal = (character) => {
    return (paths) => {
        if (character === '') { return paths; }

        return paths.filter(pipe([take(1), equals(character)])).map(consume(1));
    };
};

export const anchorStart = (paths, testString) => {
    return paths.filter((path) => path === testString);
};

export const anchorEnd = (paths) => {
    return paths.filter((path) => path === '');
};

export const integer = (paths) => {
    return paths.filter(pipe([take(1), isInteger])).map(consume(1));
};
