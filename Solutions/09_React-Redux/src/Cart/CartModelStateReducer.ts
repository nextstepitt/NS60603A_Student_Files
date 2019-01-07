// CartModelStateReducer.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import update from 'immutability-helper';
import { AnyAction } from 'redux';

import CartActionType from './CartActionType';
import CartEntry from './CartEntry';
import CartModelState from './CartModelState';

class CartModelStateReducer {

    public constructor() {

        this.reduce = this.reduce.bind(this);
    }

    public reduce(state: CartModelState | undefined, action: AnyAction): CartModelState {

        let resultState: CartModelState = state ? state : new CartModelState();

        switch (action.type) {

            case CartActionType.ADD_CART_ITEM_ACTION:
                resultState = this.reduceNewEntry(resultState, action.payload);
                break;

            case CartActionType.CLEAR_CART_ITEMS_ACTION:
                resultState = this.reduceClearEntries(resultState);
                break;
            
            case CartActionType.REMOVE_CART_ITEM_ACTION:
                resultState = this.reduceRemoveEntry(resultState, action.payload);
                break;

            default:
                break;
        }

        return resultState;
    }

    private reduceNewEntry(state: CartModelState, entry: CartEntry): CartModelState {

        entry.id = state.entryIdentity + 1;

        return update<CartModelState>(state, { entryIdentity: { $set: entry.id }, entries: { $push: [ entry ] }});
    }

    private reduceClearEntries(state: CartModelState): CartModelState {

        return update<CartModelState>(state, { entries: { $set: new Array<CartEntry>() }, entryIdentity: { $set: 0 }});
    }

    private reduceRemoveEntry(state: CartModelState, entry: CartEntry): CartModelState {

        let index = state.entries.indexOf(entry);

        return index >= 0 ? update<CartModelState>(state, { entries: { $splice: [[index, 1]] }}) : state;
    }
}

export default CartModelStateReducer;