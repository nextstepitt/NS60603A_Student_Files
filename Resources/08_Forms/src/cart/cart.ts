// cart.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Return a singleton shopping cart for the application facets to share.
//

import CartEntry from './CartEntry';

class Cart {

    public entries: CartEntry[];

    public constructor() {

        this.entries = new Array<CartEntry>();
    }

    public add(entry: CartEntry): void {

        this.entries.push(entry)
    }

    public delete(entry: CartEntry): void {

        let index = this.entries.indexOf(entry)

        if (index >= 0) {

            this.entries.splice(index, 1)
        }
    }

    public clear(): void {

        this.entries = new Array<CartEntry>();
    }

    public total(): number {

        let sum = 0

        for (let entry of this.entries) {

            sum += entry.price
        }

        return sum
    }
}

export default (new Cart());