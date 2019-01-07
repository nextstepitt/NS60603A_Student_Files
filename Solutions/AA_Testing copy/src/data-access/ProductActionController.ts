// ProductActionController.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { Dispatch } from 'redux';

import ModelAction, { createModelAction } from '../model/ModelAction';
import DataContext from './DataContext';
import ProductActionType from './ProductActionType';

class ProductActionController {

    private dispatch: Dispatch<ModelAction>;
    private dc: DataContext;

    constructor(dispatch: Dispatch<ModelAction>) {

        this.dispatch = dispatch;
        this.dc = new DataContext();
    }

    public async getBeverages(): Promise<void> {

        try {

            const beverages = await this.dc.beverageContext.getBeverages();

            this.dispatch(createModelAction(ProductActionType.SET_BEVERAGES_ACTION, beverages));
        }

        catch (error) {

            console.log(error)
        }
    }

    public async getPastries(): Promise<void> {

        try {

            const pastries = await this.dc.pastryContext.getPastries();

            this.dispatch(createModelAction(ProductActionType.SET_PASTRIES_ACTION, pastries));
        }

        catch (error) {

            console.log(error)
        }
    }
}

export default ProductActionController;