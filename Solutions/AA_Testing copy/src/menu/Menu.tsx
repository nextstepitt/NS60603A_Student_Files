// Menu.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// Note that due to limitations in TypeScript, @connect cannot be used in front of the class, so it
// is implemented the old-fashioned way as a function call in the export at the bottom of the module.
// The limitation is documented in the react-redux type mappings at
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts.
//

import React, { Component, FormEvent, ReactNode } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import '../assets/styles/application.css';
import CartActionController from '../cart/CartActionController';
import CartEntry from '../cart/CartEntry';
import CartList from '../checkout/CartList';
import CartModelState from '../cart/CartModelState';
import Product from '../data-access/Product';
import ProductActionController from '../data-access/ProductActionController';
import ApplicationModelState from '../model/ApplicationModelState';
import ProductList from './ProductList';

interface MenuProps {

    beverages: Product[];
    cart?: CartModelState;
    cartActionController?: CartActionController;
    pastries: Product[];
    productActionController?: ProductActionController;
}

class MenuState {

    public item: Product | null = null;
    public showSpecialInstructions: boolean = false;
    public specialInstructions: string = '';
}

// @connect(mapStateToProps, mapDispatchToProps)
class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public constructor(props: MenuProps) {

        super(props)

        this.addToCart = this.addToCart.bind(this);
        this.cancelAddToCart = this.cancelAddToCart.bind(this);
        this.changeSpecialInstructions = this.changeSpecialInstructions.bind(this);
        this.commitAddToCart = this.commitAddToCart.bind(this);
    }

    public addToCart(item: Product): void {

        this.setState({ showSpecialInstructions: true, item: item })
    }

    public cancelAddToCart(): void {

        this.setState({ showSpecialInstructions: false, specialInstructions: '' })
    }

    public changeSpecialInstructions(event: FormEvent<HTMLInputElement>): void {

        this.setState({ specialInstructions: event.currentTarget.value })
    }

    public commitAddToCart(): void {

        if (this.props.cartActionController && this.state.item) {

            this.props.cartActionController.addCartEntry(new CartEntry({ name: this.state.item.name, price: this.state.item.price, instructions: this.state.specialInstructions }))
            this.setState({ showSpecialInstructions: false, specialInstructions: '' })
        }
    }

    public componentDidMount(): void {

        this.props.productActionController!.getBeverages();
        this.props.productActionController!.getPastries();
    }

    public static mapStateToProps(state: ApplicationModelState, ownProps: MenuProps): any {

        return {

            beverages: state.products.beverages,
            pastries: state.products.pastries,
            cart: state.cart
        }
    }

    public static mapDispatchToProps(dispatch: Dispatch, ownProps: MenuProps): any {

        return {

            cartActionController: new CartActionController(dispatch),
            productActionController: new ProductActionController(dispatch)
        }
    }

    public render(): ReactNode {

        return (
            <div className="app-content">
                <div className={ this.state.showSpecialInstructions ? 'special-instructions-visible' : 'special-instructions-hidden' }></div>
                <div className={ this.state.showSpecialInstructions ? 'special-instructions' : 'special-instructions-hidden' }>
                    { this.state.item ? this.state.item.name : null }<br/><br/>
                    <input className="special-instructions" type="text" placeholder="Special Instructions" value={ this.state.specialInstructions } onChange={ this.changeSpecialInstructions } /><br/>
                    <div className="special-instructions-buttons">
                        <button onClick={ this.cancelAddToCart }>Cancel</button>
                        <button onClick={ this.commitAddToCart }>Add to Cart</button>
                    </div>
                </div>
                <h1>Menu</h1>
                <ProductList id="beverages" title="Beverages" products={ this.props.beverages } addToCart={ this.addToCart } />
                <ProductList id="pastries" title="Pastries" products={ this.props.pastries } addToCart={ this.addToCart } />
                <h2>Cart</h2>
                <CartList />
                { this.props.cart && this.props.cart.entries.length ? <Link to="/checkout"><button>Checkout</button></Link> : null }
            </div>
        );
    }
}

// See the comment in the header about using connect vs the @connect decorator in TypeScript.

export default connect(Menu.mapStateToProps, Menu.mapDispatchToProps)(Menu);