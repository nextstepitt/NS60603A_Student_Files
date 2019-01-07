// App.tsx
// Copyright © nTier Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Menu from '../menu/Menu'

interface AppProps {

}

class AppState {

    public showMenu: boolean = true;
}

class App extends Component<AppProps, AppState> {

    readonly state = new AppState();

    constructor(props: AppProps) {

        super(props)

        setTimeout( () => {

            this.setState( { showMenu: false } )
        
        }, 5000)
    }

    public render(): ReactNode {

        const content = this.state.showMenu ? <Menu /> : null

        return (
            <div className="app">
                <Header />
                <div className="app-content">
                    { content }
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;