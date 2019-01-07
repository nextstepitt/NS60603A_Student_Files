// ModelAction.js
// Copyright © NextStep IT Training. All rights reserved.
//

import { Action, AnyAction } from 'redux';

function createModelAction(type: string, payload?: any): ModelAction {

    return { type: type, payload: payload };
}

export default interface ModelAction extends AnyAction {

    type: string;
    payload?: any;
}

export { createModelAction }