import { pipe } from './../utils';
import { unionWith, flatMap, uniqWith } from 'lodash';

const INTEGERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const pathsAreEqual = (path, otherPath) => {
    return path.startIndex === otherPath.startIndex &&
        path.endIndex === otherPath.endIndex;
}
const take = (numToTake) => (string) => string.slice(0, numToTake);
const getPath = (pathObj) => pathObj.path;
const equals = (comparisonVal) => (value) => value === comparisonVal;
const isInteger = (string) => !!INTEGERS.find(equals(string));
const consume = (numToConsume) => (pathObj) => ({
    startIndex: pathObj.startIndex,
    endIndex: pathObj.endIndex + numToConsume,
    path: pathObj.path.slice(numToConsume)
});

const stringMap = (string, fn) => {
    let map = [];

    for (let i = 0; i < string.length; i++) {
        map[i] = fn(string[i], i);
    }

    return map;
};

export const literal = (string) => {
    return (paths) => {
        if (string === '') { return paths; }
        if (string.length > 1) {
            return pipe(stringMap(string, (c) => literal(c)))(paths);
        }

        return paths.filter(pipe([getPath, take(1), equals(string)]))
            .map(consume(1));
    };
};

export const anchorStart = (paths) => {
    return paths.filter(({ startIndex, endIndex }) => startIndex === 0 && endIndex === 0);
};

export const anchorEnd = (paths) => {
    return paths.filter(({ path }) => path === '');
};

export const integer = (paths) => {
    return paths.filter(pipe([getPath, take(1), isInteger])).map(consume(1));
};

export const lazy = (wrappedFn) => (paths) => {
    return paths.concat(wrappedFn(paths));
};

export const oneOf = (conditions) => (paths) => {
    return uniqWith(flatMap(conditions, (cond) => cond(paths)), pathsAreEqual);
};

export const greedy = (wrappedFn) => (paths) => {
    let newPaths = paths;
    let oldBaseLength = -1;
    let base = [];

    while (base.length > oldBaseLength) {
        oldBaseLength = base.length;
        newPaths = wrappedFn(newPaths);
        base = unionWith(base, newPaths, pathsAreEqual);
    }

    return base;
};
