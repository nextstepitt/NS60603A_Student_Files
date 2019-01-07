// CartActionController.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { Dispatch } from 'redux';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import ModelAction, { createModelAction } from '../model/ModelAction';
import CartActionType from './CartActionType';
import CartEntry from './CartEntry';

import InjectableTypes from '../data-access/InjectableTypes';
import { lazyInject } from '../model/inversify.config';
import { IJunkContext } from '../data-access/JunkContext';

@injectable()
class CartActionController {

    private dispatch: Dispatch<ModelAction>;
    @lazyInject(InjectableTypes.Context) private readonly junkContext?: IJunkContext;

//  public constructor(dispatch: Dispatch<ModelAction>, @inject(InjectableTypes.Context) junkContext: IJunkContext) {
    public constructor(dispatch: Dispatch<ModelAction>) {

        this.dispatch = dispatch;

        // console.log('CartActionController.constructor', junkContext);
    }

    public addCartEntry(entry: CartEntry): void {
        
        console.log('CartActionController.addCartEntry', this.junkContext);

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