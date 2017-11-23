import X, { literal, anchorStart, anchorEnd, integer } from '../src';
import { match } from './utils';

describe('regex', () => {
    describe('literal', () => {
        it('should match', () => {
            const matches = X([
                literal('w'),
                literal('o'),
                literal('w')
            ], 'awowow');

            expect(matches).to.eql([match(1, 'wow'), match(3, 'wow')]);
        });

        it('should not match', () => {
            const matches = X([
                literal('w'),
                literal('o'),
                literal('w')
            ], 'cat');

            expect(matches).to.eql([]);
        });
    });

    describe('anchorStart', () => {
        it('should match', () => {
            const matches = X([
                anchorStart,
                literal('c'),
            ], 'cat');

            expect(matches).to.eql([match(0, 'c')]);
        });

        it('should not match', () => {
            const matches = X([
                anchorStart,
                literal('c')
            ], 'a cat');

            expect(matches).to.eql([]);
        });
    });

    describe('anchorEnd', () => {
        it('should match', () => {
            const matches = X([
                literal('t'),
                anchorEnd,
            ], 'cat');

            expect(matches).to.eql([match(2, 't')]);
        });

        it('should not match', () => {
            const matches = X([
                literal('c'),
                anchorEnd,
            ], 'cat');

            expect(matches).to.eql([]);
        });
    });

    describe('integer', () => {
        it('should match', () => {
            const matches = X([
                integer,
                literal('a')
            ], 'b37a');

            expect(matches).to.eql([match(2, '7a')]);
        });

        it('should not match', () => {
            const matches = X([
                integer,
                literal('b')
            ], 'ab');

            expect(matches).to.eql([]);
        });
    });
});
