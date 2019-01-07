// ProductActionController.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Test the action-controller using a redux-mock-store. This is a unit-test of the functionality of the
// action-controller; it uses the mock store to verify that the correct action and payload originates
// from the action-controller.
//

import 'jest';
import createMockStore, { MockStore } from 'redux-mock-store';

import ModelAction, { createModelAction } from '../model/ModelAction';
import ProductActionType from './ProductActionType';
import ProductActionController from './ProductActionController';
import Product from './Product';
import ProductModelState from './ProductModelState';

describe('ProductActionController Tests', (): void => {

    let store: MockStore<ProductModelState, ModelAction>;
    let actionController: ProductActionController;

    beforeEach(() => {

        // Use an empty ProductModelState for testing. Create a mock store around the state, and register the dispatcher
        // from the store in a new action controller.

        const state: ProductModelState = new ProductModelState();

        store = createMockStore<ProductModelState>()(state);
        actionController = new ProductActionController(store.dispatch);
    })

    it('creates correct action to add a cart entry', (): void => {

        const payload: Product = { id: 0, name: 'product1', price: 2.55, instructions: 'special instructions' };
        actionController.addProduct(payload);

        const actions = store.getActions();
        const expectedPayload = { type: ProductActionType.ADD_CART_ITEM_ACTION, payload: payload };
        expect(actions).toEqual([expectedPayload]);
    });

    it('creates the correct action to clear the cart', (): void => {

        actionController.clearProduct();

        const actions = store.getActions();
        const expectedPayload = { type: ProductActionType.CLEAR_CART_ITEMS_ACTION };
        expect(actions).toEqual([expectedPayload]);
    });

    it('creates correct action to remove a cart entry', (): void => {

        const payload: Product = { id: 0, name: 'product1', price: 2.55, instructions: 'special instructions' };
        actionController.removeProduct(payload);

        const actions = store.getActions();
        const expectedPayload = { type: ProductActionType.REMOVE_CART_ITEM_ACTION, payload: payload };
        expect(actions).toEqual([expectedPayload]);
    });
});