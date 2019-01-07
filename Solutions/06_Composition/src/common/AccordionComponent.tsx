// AccordionComponent.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import React, { Component, MouseEvent, ReactNode } from 'react'

import '../assets/styles/application.css'

interface AccordionComponentProps {

    open?: boolean;
    title: string;
}

class AccordionComponentState  {

    public display: boolean = false;
}

class AccordionComponent extends Component<AccordionComponentProps, AccordionComponentState> {

    static defaultProps = {

        open: true
    }

    public readonly state = new AccordionComponentState();

    constructor(props: AccordionComponentProps) {

        super(props)

        this.toggleDisplay = this.toggleDisplay.bind(this)
    }

    public render(): ReactNode {

        let content = null;
        
        if (this.state.display) {
            
            content = this.props.children
        }

        return (
            <div className='list'>
                <div className={ `list-title ${ this.state.display ? '' : 'list-title-closed' }` } onClick={ this.toggleDisplay }>
                    &nbsp;{ this.props.title }
                </div>
                { content }
            </div>
        )
    }

    toggleDisplay(event: MouseEvent) {

        this.setState( { display: !this.state.display } )
    }
}

export default AccordionComponent