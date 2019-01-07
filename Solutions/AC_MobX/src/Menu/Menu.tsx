// Menu.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// Cafe menu view. This class initiates the transfer of data when the component mounts, and distributes
// the rendering over two ProductList instances and a CartList. The tricky part are the hidden divs
// that appear to collect special instructions when an item is added to the cart.
//

import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import React, { Component, FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/application.css';
import Cart from '../cart/Cart';
import CartEntry from '../cart/CartEntry';
import CartList from '../checkout/CartList';
import DataContext from '../data-access/DataContext';
import Product from '../data-access/Product';
import ProductModelState from '../data-access/ProductModelState';
import ProductList from './ProductList';

interface MenuProps {

    cart?: Cart;
    dataContext?: DataContext;
    productModelState?: ProductModelState;
}

class MenuState {

    public item: Product | null = null;
    public showSpecialInstructions: boolean = false;
    public specialInstructions: string = '';
}

@inject('cart', 'dataContext', 'productModelState')
@observer
class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public async loadBeverages(): Promise<void> {

        try {
        
            const beverages = await this.props.dataContext!.beverageContext.getBeverages();

            this.props.productModelState!.beverages = beverages;
        }

        catch (error) {
            
            console.log(error);
            this.props.productModelState!.beverages = new Array<Product>();
        }
    }

    @action
    public async loadPastries(): Promise<void> {
            
        try {
        
            const pastries = await this.props.dataContext!.pastryContext.getPastries();

            this.props.productModelState!.pastries = pastries;
        }

        catch (error) {
            
            console.log(error);
            this.props.productModelState!.pastries = Array<Product>();
        }
    }

    @action.bound
    public addToCart(item: Product): void {

        this.setState({ showSpecialInstructions: true, item: item })
    }

    @action.bound
    public cancelAddToCart(): void {

        this.setState({ showSpecialInstructions: false, specialInstructions: '' })
    }

    @action.bound
    public changeSpecialInstructions(event: FormEvent<HTMLInputElement>): void {

        this.setState({ specialInstructions: event.currentTarget.value })
    }

    @action.bound
    public commitAddToCart(): void {

        if (this.state.item) {

            this.props.cart!.add(new CartEntry({ name: this.state.item.name, price: this.state.item.price, instructions: this.state.specialInstructions }))
            this.setState({ showSpecialInstructions: false, specialInstructions: '' })
        }
    }

    public componentDidMount(): void {

        this.loadBeverages();
        this.loadPastries();
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
                <ProductList id="beverages" title="Beverages" products={ this.props.productModelState!.beverages } addToCart={ this.addToCart } />
                <ProductList id="pastries" title="Pastries" products={ this.props.productModelState!.pastries } addToCart={ this.addToCart } />
                <h2>Cart</h2>
                <CartList />
                { this.props.cart!.entries.length ? <Link to="/checkout"><button>Checkout</button></Link> : null }
            </div>
        );
    }
}

export default Menu;