// App.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// This is the entry point to the application. It supports injecting the Router and the MobX
// Provider around the Main component.
//

import { Provider } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import '../assets/styles/application.css';
import Cart from '../cart/Cart';
import AccordionViewState from '../common/AccordionViewState';
import DataContext from '../data-access/DataContext';
import ProductModelState from '../data-access/ProductModelState';
import Main from './Main';

let stores = {
    accordionViewState: new AccordionViewState(),
    cart: new Cart(),
    dataContext: new DataContext(),
    productModelState: new ProductModelState()
};

class App extends Component {

    public render(): ReactNode {

        return (
            <Router>
                <Provider { ...stores }>
                    <Main />
                </Provider>
            </Router>
        );
    }
}

export default App;