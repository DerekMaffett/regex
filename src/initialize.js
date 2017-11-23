const initialize = (testString) => {
    return Array(testString.length + 1).fill('').map((_item, i) => ({
        startIndex: i,
        endIndex: i,
        path: testString.slice(i)
    }));
};

export default initialize;
