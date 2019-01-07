// AccordionViewState.ts
// Copyright © NextStep IT Training. All rights reserved.
//
// The state of the accoridon components in the application. This is automatically used
// if the accordion has an id assigned to it. The state is a simple object that implements
// a dictionary; new properties are added to it as dynamic properties (even in TypeScript).
//
// To allow for dynamic properties note the sytnax of { [k: string]: boolean }
//

class AccordionViewState {

    [k: string]: boolean;
}

export default AccordionViewState;