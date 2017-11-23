import { anchorStart, anchorEnd, beginAnywhere, literal, integer } from '../../src/conditions';

describe('conditions', () => {
    describe('literal', () => {
        it('should consume the literal and return only consumables with consumption', function () {
            const paths = literal('a')(['bata', 'ata', 'ta', 'a'], 'bata');

            expect(paths).to.eql(['ta', '']);
        });

        it('should be a noop when the literal is empty', function () {
            const paths = literal('')(['cat', 'at'], 'cat');

            expect(paths).to.eql(['cat', 'at']);
        });
    });

    describe('beginAnywhere', () => {
        it('should return all possible paths', function () {
            const paths = beginAnywhere(['cat'], 'cat');

            expect(paths).to.eql(['cat', 'at', 't', '']);
        });
    });

    describe('anchorStart', () => {
        it('should return only paths equaling the test string', function () {
            const paths = anchorStart(['cat', 'at', 't', ''], 'cat');

            expect(paths).to.eql(['cat']);
        });
    });

    describe('anchorEnd', () => {
        it('should return only empty string paths', function () {
            const paths = anchorEnd(['at', 't', '', ''], 'cat');

            expect(paths).to.eql(['', '']);
        });
    });

    describe('integer', () => {
        it('should return all possible paths', function () {
            const paths = integer(['7at8', 'at8', 't8', '8', ''], '7at8');

            expect(paths).to.eql(['at8', '']);
        });
    });
});
