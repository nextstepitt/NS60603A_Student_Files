// Routes.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';
import { Route, Switch } from 'react-router';

import Checkout from '../checkout/Checkout';
import Landing from '../landing/Landing';
import Menu from '../menu/Menu';

interface RoutesProps {

}

class Routes extends Component<RoutesProps> {

    public render(): ReactNode {

        return (
            <Switch>
                <Route path="/" exact={ true } component={ Landing } />
                <Route path="/menu" component={ Menu } /> } />
                <Route path="/checkout" component={ Checkout } /> } />
            </Switch>
        );
    }
}

export default Routes;