const applyRegex = (conditions, testString) => {
    const successfulPaths = conditions.reduce((possiblePaths, cond) => {
        console.log(possiblePaths);
        return cond(possiblePaths, testString);
    }, [testString]);

    console.log(successfulPaths);

    return successfulPaths.length > 0;
}

export default applyRegex;
