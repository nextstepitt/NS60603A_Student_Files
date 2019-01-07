// CartActionController.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Test the action-controller using a redux-mock-store. This is a unit-test of the functionality of the
// action-controller; it uses the mock store to verify that the correct action and payload originates
// from the action-controller.
//

import 'jest';
import createMockStore, { MockStore } from 'redux-mock-store';

import ModelAction, { createModelAction } from '../model/ModelAction';
import CartActionType from './CartActionType';
import CartActionController from './CartActionController';
import CartEntry from './CartEntry';
import CartModelState from './CartModelState';

describe('CartActionController Tests', (): void => {

    let store: MockStore<CartModelState, ModelAction>;
    let actionController: CartActionController;

    beforeEach(() => {

        // Use an empty CartModelState for testing. Create a mock store around the state, and register the dispatcher
        // from the store in a new action controller.

        const state: CartModelState = new CartModelState();

        store = createMockStore<CartModelState>()(state);
        actionController = new CartActionController(store.dispatch);
    })

    it('creates correct action to add a cart entry', (): void => {

        const payload: CartEntry = { id: 0, name: 'product1', price: 2.55, instructions: 'special instructions' };
        actionController.addCartEntry(payload);

        const actions = store.getActions();
        const expectedPayload = { type: CartActionType.ADD_CART_ITEM_ACTION, payload: payload };
        expect(actions).toEqual([expectedPayload]);
    });

    it('creates the correct action to clear the cart', (): void => {

        actionController.clearCart();

        const actions = store.getActions();
        const expectedPayload = { type: CartActionType.CLEAR_CART_ITEMS_ACTION };
        expect(actions).toEqual([expectedPayload]);
    });

    it('creates correct action to remove a cart entry', (): void => {

        const payload: CartEntry = { id: 0, name: 'product1', price: 2.55, instructions: 'special instructions' };
        actionController.removeCartEntry(payload);

        const actions = store.getActions();
        const expectedPayload = { type: CartActionType.REMOVE_CART_ITEM_ACTION, payload: payload };
        expect(actions).toEqual([expectedPayload]);
    });
});