// AccordionViewStateReducer.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import update from 'immutability-helper';
import { AnyAction } from 'redux';

import AccordionActionType from './AccordionActionType';
import AccordionViewState from './AccordionViewState';
import AccordionState from './AccordionState';

class AccordionViewStateReducer {

    public constructor() {

        this.reduce = this.reduce.bind(this)
    }

    public reduce(state: AccordionViewState | undefined, action: AnyAction): AccordionViewState {

        let resultState: AccordionViewState = state ? state : new AccordionViewState();

        switch (action.type) {

            case AccordionActionType.SET_ACCORDION_STATE_ACTION:
                resultState = this.reduceSetAccordionState(resultState, action.payload);
                break;

            default:
                break;
        }

        return resultState;
    }

    private reduceSetAccordionState(state: AccordionViewState, accordionState: AccordionState): AccordionViewState {

        return update<AccordionViewState>(state, { [accordionState.id]: { $set: accordionState.state }});
    }
}

export default AccordionViewStateReducer;