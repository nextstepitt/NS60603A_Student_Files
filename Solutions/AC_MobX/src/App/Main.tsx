// Main.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// This class renders the boilerplate for the single page application.
//

import React, { Component, ReactNode } from 'react' ;

import Footer from '../common/Footer';
import Header from '../common/Header';
import Navigation from './Navigation';
import Routes from './Routes';

interface MainProps {

}

class Main extends Component<MainProps> {

    public render(): ReactNode {

        return (
            <div className="app">
                <Header />
                <Navigation />
                <div className="app-content">
                    <Routes />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;