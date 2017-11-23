import { anchorStart, anchorEnd, beginAnywhere, literal, integer } from '../../src/conditions';
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

            expect(paths).to.eql([
                path(1, 2, 'ta'),
                path(3, 4, '')
            ]);
        });

        it('should be a noop when the literal is empty', function () {
            const paths = literal('')(['cat', 'at'], 'cat');

            expect(paths).to.eql(['cat', 'at']);
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

            expect(paths).to.eql([path(0, 0, 'cat')]);
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

            expect(paths).to.eql([path(2, 3, ''), path(3, 3, '')]);
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

            expect(paths).to.eql([path(0, 1, 'at8'), path(3, 4, '')]);
        });
    });
});
