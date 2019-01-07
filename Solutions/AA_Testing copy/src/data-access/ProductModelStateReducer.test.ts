// ProductModelStateReducer.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import 'jest';

import ModelAction, { createModelAction } from '../model/ModelAction';
import Product from './Product';
import ProductActionType from './ProductActionType';
import ProductModelState from './ProductModelState';
import ProductModelStateReducer from './ProductModelStateReducer';

describe('ProductModelStateReducer Tests', (): void => {

    let reducer: ProductModelStateReducer;
    let state: ProductModelState;

    beforeEach(() => {

        reducer = new ProductModelStateReducer();
        state = new ProductModelState();
    })

    it('returns the original state (identity) when the action is not recognized', (): void => {

        const action: ModelAction = createModelAction('unknown action');
        const result: ProductModelState  = reducer.reduce(state, action);

        expect(result).toBe(state);
    });

    it('sets the beverages and produces new state with the original pastries', (): void => {

        const beverages: Product[] = new Array<Product>();
        const action: ModelAction = createModelAction(ProductActionType.SET_BEVERAGES_ACTION, beverages);
        const result = reducer.reduce(state, action);

        expect(result).not.toBe(state);
        expect(result.beverages).toBe(beverages);
        expect(result.pastries).toBe(state.pastries);
    });

    it('sets the pastries and produces new state with the original beverages', (): void => {

        const pastries: Product[] = new Array<Product>();
        const action: ModelAction = createModelAction(ProductActionType.SET_PASTRIES_ACTION, pastries);
        const result = reducer.reduce(state, action);

        expect(result).not.toBe(state);
        expect(result.pastries).toBe(pastries);
        expect(result.beverages).toBe(state.beverages);
    });
});