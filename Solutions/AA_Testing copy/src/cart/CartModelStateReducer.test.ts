// CartModelStateReducer.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import 'jest';

import ModelAction, { createModelAction } from '../model/ModelAction';
import CartActionType from './CartActionType';
import CartEntry from './CartEntry';
import CartModelState from './CartModelState';
import CartModelStateReducer from './CartModelStateReducer';

describe('CartModelStateReducer Tests', (): void => {

    let reducer: CartModelStateReducer;
    let state: CartModelState;

    beforeEach(() => {

        reducer = new CartModelStateReducer();
        state = new CartModelState();
    })

    it('returns the original state (identity) when the action is not recognized', (): void => {

        const action: ModelAction = createModelAction('unknown action');
        const result: CartModelState  = reducer.reduce(state, action);

        expect(result).toBe(state);
    });

    it('adds cart entries with next sequential id and produces new state', (): void => {

        const cartEntry: CartEntry = new CartEntry({ id: 0, name: null, price: 0, instructions: null });
        const action: ModelAction = createModelAction(CartActionType.ADD_CART_ITEM_ACTION, cartEntry);
        const result = reducer.reduce(state, action);

        expect(result).not.toBe(state);
        expect(result.entries[result.entries.length - 1].id).toEqual(state.entryIdentity + 1);
    });

    it('clears the cart and resets the identity', (): void => {

        state.entries.push({ id: 1, name: 'name1', price: 0, instructions: '' })
        state.entries.push({ id: 2, name: 'name1', price: 0, instructions: '' })
        state.entries.push({ id: 3, name: 'name3', price: 0, instructions: '' })
        state.entryIdentity = 3;

        const action: ModelAction = createModelAction(CartActionType.CLEAR_CART_ITEMS_ACTION);
        const result = reducer.reduce(state, action);

        expect(result).not.toBe(state);
        expect(result.entries.length).toEqual(0);
        expect(result.entryIdentity).toEqual(0);
    });

    it('removes the last entry and leaves the identity set', (): void => {

        const entry1 = { id: 1, name: 'name1', price: 0, instructions: '' };
        const entry2 = { id: 2, name: 'name1', price: 0, instructions: '' };
        const entry3 = { id: 3, name: 'name3', price: 0, instructions: '' };

        state.entries.push(entry1)
        state.entries.push(entry2)
        state.entries.push(entry3)
        state.entryIdentity = 3;

        const action: ModelAction = createModelAction(CartActionType.REMOVE_CART_ITEM_ACTION, entry3);
        const result = reducer.reduce(state, action);

        expect(result).not.toBe(state);
        expect(result.entries.length).toEqual(2);
        expect(result.entries[0].id).toEqual(1);
        expect(result.entries[1].id).toEqual(2);
        expect(result.entryIdentity).toEqual(3);
    });

    it('removes the first entry and leaves the identity set', (): void => {

        const entry1 = { id: 1, name: 'name1', price: 0, instructions: '' };
        const entry2 = { id: 2, name: 'name1', price: 0, instructions: '' };
        const entry3 = { id: 3, name: 'name3', price: 0, instructions: '' };

        state.entries.push(entry1)
        state.entries.push(entry2)
        state.entries.push(entry3)
        state.entryIdentity = 3;

        const action: ModelAction = createModelAction(CartActionType.REMOVE_CART_ITEM_ACTION, entry1);
        const result = reducer.reduce(state, action);

        expect(result).not.toBe(state);
        expect(result.entries.length).toEqual(2);
        expect(result.entries[0].id).toEqual(2);
        expect(result.entries[1].id).toEqual(3);
        expect(result.entryIdentity).toEqual(3);
    });

    it('removes the middle entry and leaves the identity set', (): void => {

        const entry1 = { id: 1, name: 'name1', price: 0, instructions: '' };
        const entry2 = { id: 2, name: 'name1', price: 0, instructions: '' };
        const entry3 = { id: 3, name: 'name3', price: 0, instructions: '' };

        state.entries.push(entry1)
        state.entries.push(entry2)
        state.entries.push(entry3)
        state.entryIdentity = 3;

        const action: ModelAction = createModelAction(CartActionType.REMOVE_CART_ITEM_ACTION, entry2);
        const result = reducer.reduce(state, action);

        expect(result).not.toBe(state);
        expect(result.entries.length).toEqual(2);
        expect(result.entries[0].id).toEqual(1);
        expect(result.entries[1].id).toEqual(3);
        expect(result.entryIdentity).toEqual(3);
    });
});