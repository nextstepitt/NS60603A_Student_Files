// ProductModelState.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Keep track of the open/closed state of the product lists.
//

import { observable } from 'mobx';

import Product from './Product';

class ProductModelState {

    @observable public beverages: Product[] = new Array<Product>();
    @observable public pastries: Product[] = new Array<Product>();
}

export default ProductModelState;