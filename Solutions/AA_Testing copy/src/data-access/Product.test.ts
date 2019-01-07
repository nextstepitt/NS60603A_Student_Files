// Product.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import 'jest';

import Product from './Product';

describe('Product Tests', (): void => {

    it('produces an empty Product when nothing is passed to the constructor', (): void => {

        const result: Product = new Product();

        expect(result).toEqual({ id: 0, name: null, price: 0 });
    });

    it('produces an empty Product when null is passed to the constructor', (): void => {

        const result: Product = new Product(null);

        expect(result).toEqual({ id: 0, name: null, price: 0 });
    });

    it('produces a valid Product when raw data is passed to the constructor', (): void => {

        const result: Product = new Product({ id: 1, name: 'name', price: 99 });

        expect(result).toEqual({ id: 1, name: 'name', price: 99 });
    });
});