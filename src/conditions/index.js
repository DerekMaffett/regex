export const literal = (character) => {
    return (paths) => {
        return paths.filter((path) => {
            return path[0] === character;
        }).map((permitted) => {
            return permitted.slice(1);
        });
    };
};
