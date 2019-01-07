// AccordionComponent.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// This component wraps anything in a collapsible block that the user can
// show and hide by clicking on the title. The client does not need to allow
// the global state; the accordionViewState does not have to be injected,
// and an id does not have to be provided.
//

import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component, MouseEvent, ReactNode } from 'react'

import '../assets/styles/application.css'
import AccordionViewState from './AccordionViewState';

interface AccordionComponentProps {

    accordionViewState?: AccordionViewState;
    id?: string;
    open: boolean;
    title: string;
}

class AccordionComponentState  {

    public display: boolean = false;
}

@inject('accordionViewState')
@observer
class AccordionComponent extends Component<AccordionComponentProps, AccordionComponentState> {

    public static defaultProps = {

        open: true
    }

    public readonly state = new AccordionComponentState();

    public componentDidMount(): void {

        let open: boolean = false;

        if (this.props.open !== undefined) {

            open = this.props.open;
        }

        if (this.props.id && this.props.accordionViewState) {

            open = this.props.accordionViewState.accordions[this.props.id];
        }

        this.setState({ display: open });
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
        );
    }

    @action.bound
    private toggleDisplay(event: MouseEvent) {

        let newDisplayState: boolean = !this.state.display;

        if (this.props.id && this.props.accordionViewState) {

            this.props.accordionViewState!.accordions[this.props.id] = newDisplayState;
        }

        this.setState( { display: newDisplayState } )
    }
}

export default AccordionComponent;