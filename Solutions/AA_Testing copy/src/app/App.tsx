// App.tsx
// Copyright © NextStep IT Training. All rights reserved.
//
// This is the entry point to the application. The Redux provider is injected at the top, followed
// by the Router component.
//

import { Provider as InversifyProvider } from 'inversify-react';
import React, { Component, ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'reflect-metadata';

import '../assets/styles/application.css';
import ApplicationModelStoreController from '../model/ApplicationModelStoreController';
import inversifyContainer from '../model/inversify.config';
import Main from './Main';

interface AppProps {

}

class App extends Component<AppProps> {

    private applicationModelStoreController: ApplicationModelStoreController = new ApplicationModelStoreController();

    public render(): ReactNode {

        /*
        return (
            <InversifyProvider container={ inversifyContainer }>
                <ReduxProvider store={ this.applicationModelStoreController.store }>
                    <Router>
                        <Main />
                    </Router>
                </ReduxProvider>
            </InversifyProvider>
        );
        */

        return (
                <ReduxProvider store={ this.applicationModelStoreController.store }>
                    <Router>
                        <Main />
                    </Router>
                </ReduxProvider>
        );
    }
}

export default App;