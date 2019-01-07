// Menu.js
// Copyright © NextStep IT Training. All rights reserved.
//
// Cafe menu view.
//

import React, { Component, ReactNode } from 'react';

import '../Assets/styles/application.css';
import Product from './Product';

class Menu extends Component {

    private beverages: Product[];
    private pastries: Product[];

    public constructor(props) {

        super(props)

        this.beverages = [
            new Product( { id: 1, name: 'Juan Valdez Reserve Cafe - Small', price: 1.85  } ),
            new Product( { id: 2, name: 'Cappuccino - Small', price: 2.65 } ),
            new Product( { id: 3, name: 'Cafe Latte', price: 2.95 } )
        ];

        this.pastries = [

            new Product( { id: 4, name: 'Blueberry Scone', price: 2.45 }),
            new Product( { id: 5, name: 'Cheese Danish', price: 2.54 }),
            new Product( { id: 6, name: 'Double Chocolate Brownie', price: 2.35 })
        ];
    }
}

export default Menu