// AccordionActionController.ts
// Copyright © NextStep IT Training. All rights reserved.
//

import { Dispatch } from 'redux';

import ModelAction, { createModelAction } from '../model/ModelAction';
import AccordionActionType from './AccordionActionType';
import AccordionState from './AccordionState';

class AccordionActionController {

    private dispatch: Dispatch<ModelAction>;

    public constructor(dispatch: Dispatch<ModelAction>) {

        this.dispatch = dispatch;
    }

    public setAccordionState(accordionState: AccordionState): void {

        this.dispatch(createModelAction(AccordionActionType.SET_ACCORDION_STATE_ACTION, accordionState));
    }
}

export default AccordionActionController;