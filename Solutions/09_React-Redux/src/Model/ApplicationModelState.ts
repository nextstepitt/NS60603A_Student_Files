// ApplicationModelState.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import CartModelState from '../cart/CartModelState';
import AccordionViewState from '../common/AccordionViewState';
import ProductModelState from '../data-access/ProductModelState';

interface ApplicationModelState {

    accordionStates: AccordionViewState;
    cart: CartModelState;
    products: ProductModelState;
}

export default ApplicationModelState;