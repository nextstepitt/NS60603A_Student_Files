// index.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// This is a single file example of using MobX with React; both the observer pattern and injection.
// All of the components are here in one place, but they could easily be separated into their own
// individual modules: ExampleStore, ObserverComponent, App (with the Provider), and index.
//

import './assets/styles/index.css';
import logo from './assets/images/nsbanner.png'
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Provider } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';

// ExampleStore is the class that defines a store. The ITriple interface and the Triple class are used
// as part of the store.
//
// MobX allows and encourages multiple stores, which is not always a bad thing even though Redux
// claim it to be. Multiple stores support separation of concerns, single responsibility, etc.
//
// @observable is a decorator that marks the properties of the store that are tracked by MobX.
// MobX does not actually track and compare the values, it watches for property values to be changed.
// In the case of the array, it inserts a proxy object between the property and the array to monitor
// for any changes to the array.
// 

interface ITriple {

    x: number;
    y: number;
    z: number;
}

class Triple implements ITriple {

    public x: number = 0;
    public y: number = 0;
    @observable public z: number = 0;
}

class ExampleStore {

    @observable public numberValue: number = 0;
    @observable public stringValue: string = 'bad initial value';
    @observable public dateValue: Date = new Date();
    @observable public arrayValue: Array<number> = [ 1 ];
    @observable public plainObject: ITriple = { x: 0, y: 0, z: 0 };
    @observable public classObject: Triple = new Triple();

    public constructor() {

        // The constructor may be used to set "initial" values for the fields, but if the field does not
        // have a value assigned at the time of creation then @observable will never watch it. And the
        // constructor assigning a value is after the time of creation.

        this.stringValue = '(wait for it)';
    }
}

// This is a React component that will observe the store. The @inject decorator accepts one or more stores
// to inject, by name. The stores must be registered with the same names (see the Validator below). The
// @observer decorator binds this component to the data used in the class methods; if the data changes
// then MobX will cause the component to be re-rendered.
//
// Because the store is not passed as a prop when the component is actually rendered (it is injected by MobX),
// the prop has to be an optional prop. But that leads to a problem in the component, because referencing
// properties of the store will cause TS errors as it sees that the prop could be null. Instead of doing a
// lot of conditional statements checking to see that the prop is not null before using it, judicious use
// of the TS ! operator to mute the error will work because we "know" that the prop will never be null.

interface ObserverComponentProps {

    exampleStore?: ExampleStore;
}

@inject('exampleStore')
@observer
class ObserverComponent extends Component<ObserverComponentProps> {

    constructor(props: ObserverComponentProps) {

        super(props);
    }

    public render(): ReactNode {
        
        return (
            <div>
                 
                <h1>MobX @observable</h1>
                
                <p>The following table contains examples a store with numbers, strings, built-in objects (Date), arrays,
                    plain (literal) objects, and class instances being changed and observed:</p>
                
                <table>
                    <thead>
                        <tr>
                            <th className="column-header">State Type</th>
                            <th className="column-header">Value</th>
                            <th className="column-header">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="row-header">Number</th>
                            <td>{ this.props.exampleStore!.numberValue }</td>
                            <td><button onClick={() => this.props.exampleStore!.numberValue++ }>Increment the number</button></td>
                        </tr>
                        <tr>
                            <th className="row-header">String</th>
                            <td>{ this.props.exampleStore!.stringValue }</td>
                            <td><label>Enter text: <input type="text"
                                onChange={(event) => this.props.exampleStore!.stringValue = event.target.value } /></label></td>
                        </tr>
                        <tr>
                            <th className="row-header">Date</th>
                            <td>{ this.props.exampleStore!.dateValue.toLocaleDateString() }</td>
                            <td><button onClick={ () => {
                                this.props.exampleStore!.dateValue = new Date(this.props.exampleStore!.dateValue.getTime() +
                                    24 * 60 * 60 * 1000);
                                } }>Add one day</button></td>
                        </tr>
                        <tr>
                            <th className="row-header">Array</th>
                            <td>{ this.props.exampleStore!.arrayValue.join(', ') }</td>
                            <td><button onClick={() => {
                                let array = this.props.exampleStore!.arrayValue;
                                array.push(array.length + 1);
                                } }>Append the next number</button></td>
                        </tr>
                        <tr>
                            <th className="row-header">Plain Object &#123; x, y, z &#125;&dagger;</th>
                            <td>{ this.props.exampleStore!.plainObject.x },&nbsp;
                                { this.props.exampleStore!.plainObject.y },&nbsp;
                                { this.props.exampleStore!.plainObject.z }</td>
                            <td><button onClick={() => this.props.exampleStore!.plainObject.x++ }>Increment x</button>&nbsp;
                                <button onClick={() => this.props.exampleStore!.plainObject.y++ }>Increment y</button>&nbsp;
                                <button onClick={() => this.props.exampleStore!.plainObject.z++ }>Increment z</button></td>
                        </tr>
                        <tr>
                            <th className="row-header">Class Instance &#123; x, y, z &#125;&dagger;&dagger;</th>
                            <td>{ this.props.exampleStore!.classObject.x },&nbsp;
                                { this.props.exampleStore!.classObject.y },&nbsp;
                                { this.props.exampleStore!.classObject.z }</td>
                            <td><button onClick={() => this.props.exampleStore!.classObject.x++ }>Increment x</button>&nbsp;
                                <button onClick={() => this.props.exampleStore!.classObject.y++ }>Increment y</button>&nbsp;
                                <button onClick={() => this.props.exampleStore!.classObject.z++ }>Increment z</button></td>
                        </tr>
                    </tbody>
                </table>

                <p>&dagger;
                    @observable follows properties into the plain object, so every time x, y, or z are changed it triggers a
                    re-rendering of the component.</p>
                <p>&dagger;&dagger;
                    @observable does <i>not</i> follow properties into a class instance. So, only the y property is marked as
                    @observable <i>inside of the class</i>, and only when y changes is the component re-rendered.
                    You will eventually see the values of x and y change, when something else causes the component to be rendered,
                    such as a change to another obvservable store property (click another button up above).</p>

                <div className="copyright">Copyright &copy; 2018 NextStep IT Training. All rights reserved.</div>
            </div>
        );
    }
}

// Create the store(s). This is the pattern for multiple stores: each store created will be passed as a named
// prop to Validator. This is accomplished by assigning each store to a property in an object, and then expanding
// the object as the properties of Validator.

const stores = { exampleStore: new ExampleStore() };

ReactDOM.render(
    <Provider { ...stores }>
        <ObserverComponent />
    </Provider>,
    document.getElementById('root'));