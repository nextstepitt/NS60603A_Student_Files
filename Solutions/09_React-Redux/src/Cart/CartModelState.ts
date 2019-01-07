// CartModelState.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import CartEntry from './CartEntry';

class CartModelState {

    public entries: CartEntry[] = new Array<CartEntry>();
    public entryIdentity: number = 0;
}

export default CartModelState;