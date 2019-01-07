// Cart.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Cart supports a shopping cart with CartEntry instances for each item added.
//

import { action, observable  } from 'mobx';

import CartEntry from './CartEntry';

class Cart {

    @observable public entries: Array<CartEntry> = new Array<CartEntry>();
    private entryIdentity: number = 0;

    @action
    public add(entry: CartEntry): void {

        if (!entry.id) {

            entry.id = ++this.entryIdentity;
        }
        
        this.entries.push(entry);
    }

    @action
    public delete(entry: CartEntry): void {

        let index = this.entries.indexOf(entry);

        if (index >= 0) {

            this.entries.splice(index, 1);
        }
    }

    @action
    public clear(): void {

        this.entries = new Array<CartEntry>();
    }

    public total(): number {

        // To be efficient, the prices are summed by reducing CartEntry objects, and then just the price is returned.

        return this.entries.length !== 0 ? this.entries.reduce( (a: CartEntry, b: CartEntry) => { return { id: 0, name: '', price: a.price + b.price, instructions: '' } }).price : 0;
    }
}

export default Cart;