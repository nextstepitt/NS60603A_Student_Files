// ProductList.tsx
// Copyright © NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css';
import Product from './Product';
import ProductItem from './ProductItem';

interface ProductListProps {

    title: string;
    products: Product[];
}

class ProductList extends Component<ProductListProps> {

    public render(): ReactNode {

        let productItems = this.props.products.map( (product) => <ProductItem key={ product.id } product={ product } /> )

        return (
            <div className="list">
                <div className="list-title">{ this.props.title }</div>
                <table className="list">
                    <thead>
                        <tr>
                            <th className="list-name"></th>
                            <th className="list-price">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productItems }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductList;