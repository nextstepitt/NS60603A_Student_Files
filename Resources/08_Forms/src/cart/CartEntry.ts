// CartEntry.ts
// Copyright © NextStep IT Traning. All rights reserved.
//
// An entry in the shopping cart. The price could be different, or there could be special instructions.
//

class CartEntry {

    public id: number;
    public name: string;
    public price: number;
    public instructions: string;

    constructor(source: any) {

        this.id = source && source.id ? source.id : 0;
        this.name = source && source.name ? source.name : null;
        this.price = source && source.price ? source.price : 0;
        this.instructions = source && source.price ? source.price : null;
    }
}

export default CartEntry;