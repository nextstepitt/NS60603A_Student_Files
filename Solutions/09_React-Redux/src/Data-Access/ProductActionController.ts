// ProductActionController.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { Dispatch } from 'redux';

import ModelAction, { createModelAction } from '../model/ModelAction';
import dataContext from './dataContext';
import ProductActionType from './ProductActionType';

class ProductActionController {

    private dispatch: Dispatch<ModelAction>;

    constructor(dispatch: Dispatch<ModelAction>) {

        this.dispatch = dispatch;
    }

    public async getBeverages(): Promise<void> {

        try {

            const beverages = await dataContext.beverageContext.getBeverages();

            this.dispatch(createModelAction(ProductActionType.SET_BEVERAGES_ACTION, beverages));
        }

        catch (error) {

            console.log(error);
        }
    }

    public async getPastries(): Promise<void> {

        try {

            const pastries = await dataContext.pastryContext.getPastries();

            this.dispatch(createModelAction(ProductActionType.SET_PASTRIES_ACTION, pastries));
        }

        catch (error) {

            console.log(error);
        }
    }
}

export default ProductActionController;