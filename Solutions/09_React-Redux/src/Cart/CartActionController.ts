// CartActionController.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { Dispatch } from 'redux';

import ModelAction, { createModelAction } from '../model/ModelAction';
import CartActionType from './CartActionType';
import CartEntry from './CartEntry';

class CartActionController {

    private dispatch: Dispatch<ModelAction>;

    public constructor(dispatch: Dispatch<ModelAction>) {

        this.dispatch = dispatch;
    }

    public addCartEntry(entry: CartEntry): void {

        this.dispatch(createModelAction(CartActionType.ADD_CART_ITEM_ACTION, entry));
    }

    public clearCart(): void {

        this.dispatch(createModelAction(CartActionType.CLEAR_CART_ITEMS_ACTION));
    }

    public removeCartEntry(entry: CartEntry): void {

        this.dispatch(createModelAction(CartActionType.REMOVE_CART_ITEM_ACTION, entry));
    }
}

export default CartActionController;