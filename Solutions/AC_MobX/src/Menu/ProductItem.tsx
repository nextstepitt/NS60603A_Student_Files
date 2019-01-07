// ProductItem.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// An individual item rendered in ProductList.
//

import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css';
import Product from '../data-access/Product';

interface ProductItemProps {

    addToCart(product: Product): void;
    product: Product;
}

class ProductItem extends Component<ProductItemProps> {

    public render(): ReactNode {

        return (
            <tr>
                <td className="list-name">{this.props.product.name}</td>
                <td className="list-price">${this.props.product.price.toFixed(2)}</td>
                <td className="list-add-button"><button onClick={ () => this.props.addToCart(this.props.product) }>Add to cart</button></td>
            </tr>
        );
    }
}

export default ProductItem;