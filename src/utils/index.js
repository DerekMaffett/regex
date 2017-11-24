export const pipe = (funcs) => (init) => funcs.reduce((accum, func) => func(accum), init);
