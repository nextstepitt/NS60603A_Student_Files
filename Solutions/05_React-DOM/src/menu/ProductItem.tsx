// ProductItem.tsx
// Copyright © NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';

import '../assets/styles/application.css';
import Product from '../data-access/Product';


interface ProductItemProps {

    product: Product;
}

class ProductItem extends Component<ProductItemProps> {

    public render(): ReactNode {

        return (
            <tr>
                <td className="list-name">{this.props.product.name}</td>
                <td className="list-price">${this.props.product.price.toFixed(2)}</td>
            </tr>
        );
    }
}

export default ProductItem;