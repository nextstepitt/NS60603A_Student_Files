// Menu.js
// Copyright © NextStep IT Training. All rights reserved.
//
// Cafe menu view.
//

import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css';
import dataContext from '../data-access/dataContext';
import Product from '../data-access/Product';
import ProductList from './ProductList';

interface MenuProps {

}

class MenuState {

    public beverages: Product[] = Array<Product>();
    public pastries: Product[] = Array<Product>();
}

class Menu extends Component<MenuProps, MenuState> {

    public readonly state = new MenuState();

    public constructor(props: MenuProps) {

        super(props)

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

    public render(): ReactNode {

        return (
            <div className="app-content">
                <h1>Menu</h1>
                <ProductList title="Beverages" products={ this.state.beverages } />
                <ProductList title="Pastries" products={ this.state.pastries } />
            </div>
        );
    }
}

export default Menu;