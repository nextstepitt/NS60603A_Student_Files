// Product.ts
// Copyright © NextStep IT Training. All rights reserved.
//

class Product {

    public id: number;
    public name: string;
    public price: number;

    public constructor(source: any) {

        this.id = source && source.id ? source.id : 0;
        this.name = source && source.name ? source.name : '';
        this.price = source && source.price ? source.price : 0;
    }
}

export default Product;