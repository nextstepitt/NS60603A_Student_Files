// App.tsx
// Copyright © nTier Training. All rights reserved.
//

import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Menu from '../menu/Menu'

class App extends Component {

    public render(): ReactNode {

        return (
            <div className="app">
                <Header />
                <div className="app-content">
                    <Menu />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;