// ProductList.tsx
// Copyright © NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css';
import AccordionComponent from '../common/AccordionComponent'
import Product from '../data-access/Product';
import ProductItem from './ProductItem';

interface ProductListProps {

    title: string;
    products: Product[];
}

class ProductList extends Component<ProductListProps> {


    public render(): ReactNode {

        let content = null

        if (!this.props.products || this.props.products.length === 0) {

            content = <span className="error">The list is not loaded.</span>
        
        } else {

            let productItems = this.props.products.map( (product) => <ProductItem key={ product.id } product={ product } /> )

            content = (
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
            );
        }

        return (
            <AccordionComponent title={ this.props.title } open={ false }>
                { content }
            </AccordionComponent>
        );
    }
}

export default ProductList;