// CartEntry.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import 'jest';

import CartEntry from './CartEntry';

describe('CartEntry Tests', (): void => {

    it('produces an empty CartEntry when nothing is passed to the constructor', (): void => {

        const result: CartEntry = new CartEntry();

        expect(result).toEqual({ id: 0, name: null, price: 0, instructions: null });
    });

    it('produces an empty CartEntry when null is passed to the constructor', (): void => {

        const result: CartEntry = new CartEntry(null);

        expect(result).toEqual({ id: 0, name: null, price: 0, instructions: null });
    });

    it('produces a valid CartEntry when raw data is passed to the constructor', (): void => {

        const result: CartEntry = new CartEntry({ id: 1, name: 'name', price: 99, instructions: 'impsum dolor' });

        expect(result).toEqual({ id: 1, name: 'name', price: 99, instructions: 'impsum dolor' });
    });
});