import initialize from '../src/initialize';
import { path } from './utils';

describe('initialize', () => {
    it('should return all possible paths', function () {
        const paths = initialize('cat');

        expect(paths).to.eql([
            path(0, 0, 'cat'),
            path(1, 1, 'at'),
            path(2, 2, 't'),
            path(3, 3, '')
        ]);
    });
});

