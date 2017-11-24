import X, { literal, anchorStart, anchorEnd, integer, lazy, greedy, oneOf } from '../src';
import { match } from './utils';

describe('regex', () => {
    describe('literal', () => {
        it('should match', () => {
            const matches = X([
                literal('w'),
                literal('o'),
                literal('w')
            ], 'awowow');

            expect(matches).to.have.deep.members([match(1, 'wow'), match(3, 'wow')]);
        });

        it('should match when concatenated', () => {
            const matches = X([
                literal('wow')
            ], 'awowow');

            expect(matches).to.have.deep.members([match(1, 'wow'), match(3, 'wow')]);
        });

        it('should not match', () => {
            const matches = X([
                literal('w'),
                literal('o'),
                literal('w')
            ], 'cat');

            expect(matches).to.have.deep.members([]);
        });
    });

    describe('anchorStart', () => {
        it('should match', () => {
            const matches = X([
                anchorStart,
                literal('c'),
            ], 'cat');

            expect(matches).to.have.deep.members([match(0, 'c')]);
        });

        it('should not match', () => {
            const matches = X([
                anchorStart,
                literal('c')
            ], 'a cat');

            expect(matches).to.have.deep.members([]);
        });
    });

    describe('anchorEnd', () => {
        it('should match', () => {
            const matches = X([
                literal('t'),
                anchorEnd
            ], 'cat');

            expect(matches).to.have.deep.members([match(2, 't')]);
        });

        it('should not match', () => {
            const matches = X([
                literal('c'),
                anchorEnd
            ], 'cat');

            expect(matches).to.have.deep.members([]);
        });
    });

    describe('integer', () => {
        it('should match', () => {
            const matches = X([
                integer,
                literal('a')
            ], 'b37a');

            expect(matches).to.have.deep.members([match(2, '7a')]);
        });

        it('should not match', () => {
            const matches = X([
                integer,
                literal('b')
            ], 'ab');

            expect(matches).to.have.deep.members([]);
        });
    });

    describe('lazy', () => {
        it('should match', () => {
            const matches = X([
                lazy(literal('c')),
                lazy(literal('a')),
                literal('a'),
                lazy(literal('w')),
                literal('t')
            ], 'cat');

            expect(matches).to.have.deep.members([
                match(0, 'cat'),
                match(1, 'at')
            ]);
        });
    });

    describe('oneOf', () => {
        it('should match', () => {
            const matches = X([
                oneOf([literal('c'), literal('b'), anchorStart]),
                literal('at')
            ], 'at cat rat sat bat');

            expect(matches).to.have.deep.members([
                match(0, 'at'),
                match(3, 'cat'),
                match(15, 'bat')
            ]);
        });
    });

    describe('greedy', () => {
        it('should match', () => {
            const matches = X([
                greedy(literal('c')),
                greedy(integer),
                literal('at')
            ], 'c7378at cccc4at 7578at c9at cat');

            expect(matches).to.have.deep.members([
                match(0, 'c7378at'),
                match(8, 'cccc4at'),
                match(9, 'ccc4at'),
                match(10, 'cc4at'),
                match(11, 'c4at'),
                match(23, 'c9at'),
            ]);
        });
    });
});
