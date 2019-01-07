// CartList.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Show the shopping cart contents, and allow the removal of items. Note that due to limitations in TypeScript,
// @connect cannot be used in front of the class, so it is implemented the old-fashioned way as a function call
// in the export at the bottom of the module. The limitation is documented in the react-redux type mappings
// at https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts.
//

import React, { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import CartModelState from '../cart/CartModelState';
import CartActionController from '../cart/CartActionController';
import CartEntry from '../cart/CartEntry';
import ApplicationModelState from '../model/ApplicationModelState';

interface CartListProps {

    cart?: CartModelState;
    cartAction?: CartActionController;
}

class CartList extends Component<CartListProps> {

    public constructor(props: CartListProps) {

        super(props);

        this.remove = this.remove.bind(this);
    }

    private cartTotal(): number {

        // To be efficient, the prices are summed by reducing CartEntry objects, and then just the price is returned.

        return this.props.cart ? this.props.cart.entries.reduce( (a: CartEntry, b: CartEntry) => { return { id: 0, name: '', price: a.price + b.price, instructions: '' } }).price : 0;
    }

    public static mapStateToProps(state: ApplicationModelState, ownProps: CartListProps): any {

        return {

            cart: state.cart
        }
    }

    public static mapDispatchToProps(dispatch: Dispatch, ownProps: CartListProps): any {

        return {

            cartAction: new CartActionController(dispatch)
        }
    }

    public render(): ReactNode {

        let result = null;
        const cart = this.props.cart

        if (cart && cart.entries.length > 0) {

            let items = cart.entries.map( (entry: CartEntry) => ( <tr key={ entry.id }>
                                                                        <td className="cart-name">{ entry.name }</td>
                                                                        <td className="cart-price">{ entry.price }</td>
                                                                        <td className="cart-remove-button"><button onClick={ () => this.remove(entry) }>Remove</button></td>
                                                                        <td className="cart-instructions">{ entry.instructions }</td>
                                                                    </tr> ));

            let total = ( <tr key="total">
                                <td className="cart-name"></td>
                                <td className="cart-price">Total: ${ this.cartTotal().toFixed(2) }</td>
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

    private remove(entry: CartEntry): void {

        this.props.cartAction && this.props.cartAction.removeCartEntry(entry);
        
        // State must change to update the view, so a dummy entry.

        this.setState({ dummy: null });
    }
}

// See the comment in the header about using connect vs the @connect decorator in TypeScript.

export default connect(CartList.mapStateToProps, CartList.mapDispatchToProps)(CartList);