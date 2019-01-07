// CartList.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Show the shopping cart contents.

import React, { Component, ReactNode } from 'react';

import cart from '../cart/cart';
import CartEntry from '../cart/CartEntry';

interface CartListProps {

}

class CartList extends Component<CartListProps> {

    public render(): ReactNode {

        let result = null;

        if (cart.entries.length > 0) {

            let items = cart.entries.map( (entry) => ( <tr key="entry.id">
                                                                        <td className="cart-name">{ entry.name }</td>
                                                                        <td className="cart-price">{ entry.price.toFixed(2) }</td>
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

    public remove(entry: CartEntry): void {

        cart.delete(entry)
        
        // State must change to update the view, so a dummy entry.

        this.setState({ dummy: null });
    }
}

export default CartList;