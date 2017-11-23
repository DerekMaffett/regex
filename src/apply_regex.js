import { beginAnywhere } from './conditions';

const applyRegex = (conditions, testString) => {
    const successfulPaths = [beginAnywhere, ...conditions]
        .reduce((possiblePaths, cond) => {
            return cond(possiblePaths, testString);
        }, [testString]);

    return successfulPaths.length > 0;
}

export default applyRegex;
