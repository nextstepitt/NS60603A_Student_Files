// CartList.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Show the shopping cart contents, and allow removal of items.
//

import { action } from 'mobx';
import { observer, inject } from 'mobx-react';
import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css';
import Cart from '../cart/Cart';
import CartEntry from '../cart/CartEntry';

interface CartListProps {

    cart?: Cart;
}

@inject('cart')
@observer
class CartList extends Component<CartListProps> {

    public render(): ReactNode {
        
        let result = null;
        const cart = this.props.cart;

        if (cart && cart!.entries.length > 0) {

            let items = cart.entries.map( (entry) => ( <tr key={ entry.id }>
                                                                    <td className="cart-name">{ entry.name }</td>
                                                                    <td className="cart-price">{ entry.price }</td>
                                                                    <td className="cart-remove-button"><button onClick={ () => this.remove(entry) }>Remove</button></td>
                                                                    <td className="cart-instructions">{ entry.instructions }</td>
                                                                </tr> ));

            let total = ( <tr key="total">
                                <td className="cart-name"></td>
                                <td className="cart-price">Total: ${ cart.total().toFixed(2) }</td>
                                <td className="cart-remove-button"></td>
                                <td className="cart-instructions"></td>
                            </tr> );

            result = ( <table className="cart">
                            <thead>
                                <tr>
                                    <th className="cart-name">Product</th>
                                    <th className="cart-price">Price</th>
                                    <th className="cart-remove-button">&nbsp;</th>
                                    <th className="cart-instructions">Special Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { items }
                                { total }
                            </tbody>
                        </table> );
        }

        return result;
    }

    @action.bound
    public remove(entry: CartEntry): void {

        this.props.cart!.delete(entry);
    }
}

export default CartList;