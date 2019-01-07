// AccordionComponent.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Note that due to limitations in TypeScript, @connect cannot be used in front of the class, so it
// is implemented the old-fashioned way as a function call in the export at the bottom of the module.
// The limitation is documented in the react-redux type mappings at
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts.
//

import React, { Component, MouseEvent, ReactNode } from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import '../assets/styles/application.css'
import ApplicationModelState from '../model/ApplicationModelState';
import AccordionActionController from './AccordionActionController';
import AccordionViewState from './AccordionViewState';

interface AccordionComponentProps {

    accordionActionController?: AccordionActionController;
    accordionStates?: AccordionViewState;
    id?: string;
    open: boolean;
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

    public componentDidMount(): void {

        let open: boolean = false;

        if (this.props.open !== undefined) {

            open = this.props.open;
        }

        if (this.props.id && this.props.accordionStates) {

            open = this.props.accordionStates[this.props.id];
        }

        this.setState({ display: open });
    }

    public static mapStateToProps(state: ApplicationModelState, ownProps: AccordionComponentProps): any {

        return {

            accordionStates: state.accordionStates
        }
    }

    public static mapDispatchToProps(dispatch: Dispatch, ownProps: AccordionComponentProps): any {

        return {

            accordionActionController: new AccordionActionController(dispatch)
        }
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

        let newDisplayState: boolean = !this.state.display;

        ;

        if (this.props.id && this.props.accordionActionController) {

            this.props.accordionActionController!.setAccordionState({ id: this.props.id, state: newDisplayState })
        }

        this.setState( { display: newDisplayState } )
    }
}

// See the comment in the header about using connect vs the @connect decorator in TypeScript.

export default connect(AccordionComponent.mapStateToProps, AccordionComponent.mapDispatchToProps)(AccordionComponent);