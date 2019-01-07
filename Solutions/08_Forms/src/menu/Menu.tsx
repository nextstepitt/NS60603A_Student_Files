// Menu.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// Cafe menu view.
//

import React, { Component, FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/application.css';
import cart from '../cart/cart';
import CartEntry from '../cart/CartEntry';
import CartList from '../checkout/CartList';
import dataContext from '../data-access/dataContext';
import Product from '../data-access/Product';
import ProductList from './ProductList';

interface MenuProps {

}

class MenuState {

    public beverages: Product[] = Array<Product>();
    public item: Product | null = null;
    public pastries: Product[] = Array<Product>();
    public showSpecialInstructions: boolean = false;
    public specialInstructions: string = '';
}

class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public constructor(props: MenuProps) {

        super(props)

        this.addToCart = this.addToCart.bind(this);
        this.cancelAddToCart = this.cancelAddToCart.bind(this);
        this.changeSpecialInstructions = this.changeSpecialInstructions.bind(this);
        this.commitAddToCart = this.commitAddToCart.bind(this);

        // These methods do asynchronous loading of the state, but the constructor cannot be async
        // so the are delegated and the promise is ignored in the constructor.
        
        this.loadBeverages();
        this.loadPastries();
    }

    public async loadBeverages(): Promise<void> {

        try {
        
            const beverages = await dataContext.beverageContext.getBeverages();

            this.setState({ beverages: beverages });
        }

        catch (error) {
            
            console.log(error);
            this.setState({ beverages: [] });
        }
    }

    public async loadPastries(): Promise<void> {

        try {
        
            const pastries = await dataContext.pastryContext.getPastries();

            this.setState({ pastries: pastries });
        }

        catch (error) {
            
            console.log(error);
            this.setState({ pastries: [] });
        }
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

        if (this.state.item) {

            cart.add(new CartEntry({ name: this.state.item.name, price: this.state.item.price, instructions: this.state.specialInstructions }))
            this.setState({ showSpecialInstructions: false, specialInstructions: '' })
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
                <ProductList title="Beverages" products={ this.state.beverages } addToCart={ this.addToCart } />
                <ProductList title="Pastries" products={ this.state.pastries } addToCart={ this.addToCart } />
                <h2>Cart</h2>
                <CartList />
                { cart.entries.length ? <Link to="/checkout"><button>Checkout</button></Link> : null }
            </div>
        );
    }
}

export default Menu;