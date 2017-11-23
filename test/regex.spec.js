import X, { literal, anchorStart, anchorEnd, integer } from '../src';

describe('regex', () => {
    describe('literal', () => {
        it('should match', () => {
            const match = X([
                literal('w'),
                literal('o'),
                literal('w')
            ], 'dawow');

            expect(match).to.eq(true);
        });

        it('should not match', () => {
            const nonMatch = X([
                literal('w'),
                literal('o'),
                literal('w')
            ], 'cat');

            expect(nonMatch).to.eq(false);
        });
    });

    describe('anchorStart', () => {
        it('should match', () => {
            const match = X([
                anchorStart,
                literal('c'),
            ], 'cat');

            expect(match).to.eq(true);
        });

        it('should not match', () => {
            const nonMatch = X([
                anchorStart,
                literal('c')
            ], 'a cat');

            expect(nonMatch).to.eq(false);
        });
    });

    describe('anchorEnd', () => {
        it('should match', () => {
            const match = X([
                literal('t'),
                anchorEnd,
            ], 'cat');

            expect(match).to.eq(true);
        });

        it('should not match', () => {
            const nonMatch = X([
                literal('c'),
                anchorEnd,
            ], 'cat');

            expect(nonMatch).to.eq(false);
        });
    });

    describe('integer', () => {
        it('should match', () => {
            const match = X([
                integer,
                literal('a')
            ], '7a');

            expect(match).to.eq(true);
        });

        it('should not match', () => {
            const nonMatch = X([
                integer,
                literal('b')
            ], 'ab');

            expect(nonMatch).to.eq(false);
        });
    });
});
