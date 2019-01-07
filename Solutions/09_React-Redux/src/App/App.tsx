// App.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// This is the entry point to the application. The Redux provider is injected at the top, followed
// by the Router component.
//

import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import '../assets/styles/application.css';
import ApplicationModelStoreController from '../model/ApplicationModelStoreController';
import Main from './Main';

interface AppProps {

}

class App extends Component<AppProps> {

    private applicationModelStoreController: ApplicationModelStoreController = new ApplicationModelStoreController();

    public render(): ReactNode {

        return (
            <Provider store={ this.applicationModelStoreController.store }>
                <Router>
                    <Main />
                </Router>
            </Provider>
        );
    }
}

export default App;