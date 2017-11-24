import { anchorStart, anchorEnd, beginAnywhere, literal, integer, lazy, greedy, oneOf } from '../../src/conditions';
import { path } from '../utils';

describe('conditions', () => {
    describe('literal', () => {
        it('should consume the literal and return only consumables with consumption', function () {
            const paths = literal('a')([
                path(0, 0, 'bata'),
                path(1, 1, 'ata'),
                path(2, 2, 'ta'),
                path(3, 3, 'a')
            ], 'bata');

            expect(paths).to.have.deep.members([
                path(1, 2, 'ta'),
                path(3, 4, '')
            ]);
        });

        it('should be a noop when the literal is empty', function () {
            const paths = literal('')([
                path(0, 0, 'bata'),
                path(1, 1, 'ata'),
                path(2, 2, 'ta'),
                path(3, 3, 'a')
            ], 'bata');

            expect(paths).to.have.deep.members([
                path(0, 0, 'bata'),
                path(1, 1, 'ata'),
                path(2, 2, 'ta'),
                path(3, 3, 'a')
            ]);
        });
    });

    describe('anchorStart', () => {
        it('should return only paths equaling the test string', function () {
            const paths = anchorStart([
                path(0, 0, 'cat'),
                path(1, 1, 'at'),
                path(2, 2, 't'),
                path(3, 3, '')
            ], 'cat');

            expect(paths).to.have.deep.members([path(0, 0, 'cat')]);
        });
    });

    describe('anchorEnd', () => {
        it('should return only empty string paths', function () {
            const paths = anchorEnd([
                path(0, 1, 'at'),
                path(1, 2, 't'),
                path(2, 3, ''),
                path(3, 3, '')
            ], 'cat');

            expect(paths).to.have.deep.members([
                path(2, 3, ''),
                path(3, 3, '')
            ]);
        });
    });

    describe('integer', () => {
        it('should return all possible paths', function () {
            const paths = integer([
                path(0, 0, '7at8'),
                path(1, 1, 'at8'),
                path(2, 2, 't8'),
                path(3, 3, '8'),
                path(4, 4, '')
            ], '7at8');

            expect(paths).to.have.deep.members([
                path(0, 1, 'at8'),
                path(3, 4, '')
            ]);
        });
    });

    describe('lazy', () => {
        it('should add all returned paths from the wrapped function', function () {
            const paths = lazy(integer)([
                path(1, 2, '7t8'),
                path(2, 3, 't8'),
                path(3, 4, '8'),
            ], '7t8');

            expect(paths).to.have.deep.members([
                path(1, 2, '7t8'),
                path(2, 3, 't8'),
                path(3, 4, '8'),
                path(1, 3, 't8'),
                path(3, 5, '')
            ]);
        });
    });

    describe('oneOf', () => {
        it('should return paths that satisfy any conditions without duplicates', function () {
            const paths = oneOf([integer, literal('7'), literal('a')])([
                path(0, 1, 'at c7t cot'),
                path(4, 5, '7t cot'),
                path(8, 9, 'ot')
            ], 'cat c7t cot');

            expect(paths).to.have.deep.members([
                path(0, 2, 't c7t cot'),
                path(4, 6, 't cot')
            ]);
        });
    });

    describe('greedy', () => {
        it('should return as many new paths that satisfy the condition as it can', function () {
            const paths = greedy(integer)([
                path(0, 0, 'c7878at98x'),
                path(0, 1, '7878at98x'),
                path(1, 1, '7878at98x'),
                path(5, 5, '98x'),
                path(8, 9, 'x')
            ], 'c7878at98x');

            expect(paths).to.have.deep.members([
                path(0, 2, '878at98x'),
                path(0, 3, '78at98x'),
                path(0, 4, '8at98x'),
                path(0, 5, 'at98x'),
                path(1, 2, '878at98x'),
                path(1, 3, '78at98x'),
                path(1, 4, '8at98x'),
                path(1, 5, 'at98x'),
                path(5, 6, '8x'),
                path(5, 7, 'x')
            ]);
        });
    });
});
