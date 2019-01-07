// ProductModelStateReducer.ts
// Copyright © NextStep IT Training. All rights Reserved.
//

import update from 'immutability-helper';
import { AnyAction } from 'redux';

import Product from './Product';
import ProductActionType from './ProductActionType';
import ProductModelState from './ProductModelState';

class ProductModelStateReducer {

    public constructor() {

        this.reduce = this.reduce.bind(this)
    }

    public reduce(state: ProductModelState | undefined, action: AnyAction): ProductModelState {

        let resultState: ProductModelState = state ? state : new ProductModelState();

        switch (action.type) {

            case ProductActionType.SET_BEVERAGES_ACTION:
                resultState = this.reduceBeverages(resultState, action.payload);
                break;

            case ProductActionType.SET_PASTRIES_ACTION:
                resultState = this.reducePastries(resultState, action.payload);
                break;

            default:
                break;
        }

        return resultState;
    }

    private reduceBeverages(state: ProductModelState, beverages: Array<Product>): ProductModelState {

        return update<ProductModelState>(state, { beverages: { $set: beverages }});
    }

    private reducePastries(state: ProductModelState, pastries: Array<Product>): ProductModelState {

        return update<ProductModelState>(state, { pastries: { $set: pastries }});
    }
}

export default ProductModelStateReducer;