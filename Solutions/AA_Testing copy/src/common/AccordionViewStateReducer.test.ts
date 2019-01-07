// AccordionViewStateReducer.test.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// Test the AccordionViewStateReducer. This tests the reducer method (and helper methods) using a
// AccordionViewState. Since the AccordionViewState is a simple data store, mocking it is
// irrelevant. We can use the store to verify that the correct information has been reduced into
// a new store.
//

import 'jest';

import ModelAction, { createModelAction } from '../model/ModelAction';
import AccordionActionType from './AccordionActionType';
import AccordionState from './AccordionState';
import AccordionViewState from './AccordionViewState';
import AccordionViewStateReducer from './AccordionViewStateReducer';

describe('AccordionViewStateReducer Tests', (): void => {

    let reducer: AccordionViewStateReducer;
    let state: AccordionViewState;

    beforeEach(() => {

        reducer = new AccordionViewStateReducer();
        state = new AccordionViewState();
    })

    it('returns the original state (identity) when the action is not recognized', () => {

        const action: ModelAction = createModelAction('unknown action');
        const result: AccordionViewState  = reducer.reduce(state, action);

        expect(result).toBe(state);
    });

    it('adds any string name as an accordion state with true', (): void => {

        const id = 'accordion1';
        const action: ModelAction = createModelAction(AccordionActionType.SET_ACCORDION_STATE_ACTION, { id: id, state: true });
        const result: AccordionViewState  = reducer.reduce(state, action);

        expect(result[id]).toEqual(true);
    });

    it('adds any string name as an accordion state with false', (): void => {

        // Just in case setting a name with a true is a false positive.

        const id = 'accordion2';
        const action: ModelAction = createModelAction(AccordionActionType.SET_ACCORDION_STATE_ACTION, { id: id, state: false });
        const result: AccordionViewState  = reducer.reduce(state, action);

        expect(result[id]).toEqual(false);
    });

    it('changes an existing state to the opposite state from true to false', (): void => {

        const id = 'accordion3';

        state[id] = true;

        const action: ModelAction = createModelAction(AccordionActionType.SET_ACCORDION_STATE_ACTION, { id: id, state: !state[id] });   
        const result: AccordionViewState  = reducer.reduce(state, action);

        expect(result[id]).toEqual(!state[id]);
    });

    it('changes an existing state to the opposite state from false to true', (): void => {

        // Just in case setting a name with a true is a false positive.

        const id = 'accordion3';

        state[id] = false;

        const action: ModelAction = createModelAction(AccordionActionType.SET_ACCORDION_STATE_ACTION, { id: id, state: !state[id] });   
        const result: AccordionViewState  = reducer.reduce(state, action);

        expect(result[id]).toEqual(!state[id]);
    });
});