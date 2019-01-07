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
    private mounted: boolean = true;

    public constructor(props: MenuProps) {

        super(props)

        console.log("Menu: constructor");

        // These methods do asynchronous loading of the state, but the constructor cannot be async
        // so the are delegated and the promise is ignored in the constructor.
        
        this.loadBeverages();
        this.loadPastries();
    }

    public componentDidMount(): void {

        console.log("Menu: componentDidMount");
    }

    public componentDidUpdate(prevProps: MenuProps, prevState: MenuState, snapshot: any): void {

        console.log("Menu: componentDidUpdate");
    }

    public componentWillUnmount(): void {

        console.log("Menu: componentWillUnmount");

        this.mounted = false;
    }

    public static getDerivedStateFromProps(props: MenuProps, state: MenuState): MenuState | null {

        console.log("Menu: getDerivedStateFromProps");

        return null;
    }

    public getSnapshotBeforeUpdate(prevProps: MenuProps, prevState: MenuState): any {

        console.log("Menu: getSnapshotFromProps");

        return null;
    }

    private async loadBeverages(): Promise<void> {

        try {
        
            const beverages: Array<Product> = await dataContext.beverageContext.getBeverages();

            this.setState({ beverages: beverages });
        }

        catch (error) {
            
            console.log(error);
            this.setState({ beverages: [] });
        }
    }

    private async loadPastries(): Promise<void> {

        try {
        
            const pastries: Array<Product> = await dataContext.pastryContext.getPastries();

            this.setState({ pastries: pastries });
        }

        catch (error) {
            
            console.log(error);
            this.setState({ pastries: [] });
        }
    }

    public render(): ReactNode {

        console.log("Menu: render")

        return (
            <div className="app-content">
                <h1>Menu</h1>
                <ProductList title="Beverages" products={ this.state.beverages } />
                <ProductList title="Pastries" products={ this.state.pastries } />
            </div>
        );
    }

    public shouldComponentUpdate(nextProps: MenuProps, nextState: MenuState): boolean {

        console.log("Menu: shouldComponentMount");

        return true;
    }
}

export default Menu;