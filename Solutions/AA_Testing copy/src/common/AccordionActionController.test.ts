// AccordionActionController.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Test the action-controller using a redux-mock-store. This is a unit-test of the functionality of the
// action-controller; it uses the mock store to verify that the correct action and payload originates
// from the action-controller.
//

import 'jest';
import createMockStore, { MockStore } from 'redux-mock-store';

import ModelAction, { createModelAction } from '../model/ModelAction';
import AccordionActionType from './AccordionActionType';
import AccordionActionController from './AccordionActionController';
import AccordionState from './AccordionState';
import AccordionViewState from './AccordionViewState';

describe('AccordionActionController Tests', (): void => {

    let store: MockStore<AccordionViewState, ModelAction>;
    let actionController: AccordionActionController;

    beforeEach(() => {

        // Use an empty AccordionViewState for testing. Create a mock store around the state, and register the dispatcher
        // from the store in a new action controller.

        const state: AccordionViewState = new AccordionViewState();

        store = createMockStore<AccordionViewState>()(state);
        actionController = new AccordionActionController(store.dispatch);
    })

    it('adds any string name as an accordion state with true', (): void => {

        const payload: AccordionState = { id: 'accordion1', state: true };
        actionController.setAccordionState(payload);

        const actions = store.getActions();
        const expectedPayload = { type: AccordionActionType.SET_ACCORDION_STATE_ACTION, payload: payload };
        expect(actions).toEqual([expectedPayload]);
    });

    it('adds any string name as an accordion state with false', (): void => {

        // Just in case setting a name with a true is a false positive.

        const payload: AccordionState = { id: 'accordion2', state: false };
        actionController.setAccordionState(payload);

        const actions = store.getActions();
        const expectedPayload = { type: AccordionActionType.SET_ACCORDION_STATE_ACTION, payload: payload };
        expect(actions).toEqual([expectedPayload]);
    });
});