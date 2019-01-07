// Footer.tsx
// Copyright © nTier Training. All rights reserved.
//
// Application footer content.
//

import React, { Component, ReactNode } from 'react';

import '../assets/styles/application.css';

interface FooterProps {

}

class Footer extends Component<FooterProps> {

    public render(): ReactNode {

        return (
            <footer className="app-footer">
                Copyright &copy; NextStep IT Training. All rights reserved.
            </footer>
        );
    }
}

export default Footer;