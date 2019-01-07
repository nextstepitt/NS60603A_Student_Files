// Checkout.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Note that due to limitations in TypeScript, @connect cannot be used in front of the class, so it
// is implemented the old-fashioned way as a function call in the export at the bottom of the module.
// The limitation is documented in the react-redux type mappings at
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts.
//

import React, { Component, FormEvent, ReactNode } from 'react';
import Validator, { cardNumberValidator } from 'react-data-validator';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import '../assets/styles/application.css';
import CartActionController from '../cart/CartActionController';
import CartModelState from '../cart/CartModelState';
import ApplicationModelState from '../model/ApplicationModelState';
import CartList from './CartList';

interface CheckoutProps {

    cart?: CartModelState;
    cartActionController?: CartActionController;
}

class CheckoutState {

    public cardNumber: string = '';
    public cardNumberIsValid: boolean = true;
    public name: string = '';
    public nameIsValid: boolean = true;
}

class Checkout extends Component<CheckoutProps, CheckoutState> {

    public readonly state = new CheckoutState();
    private cardNumberIsValid: boolean = false;
    private nameIsValid: boolean = false;

    constructor(props: CheckoutProps) {

        super(props)

        this.onChangeCardNumber = this.onChangeCardNumber.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.setCardNumberValidationState = this.setCardNumberValidationState.bind(this)
        this.setNameValidationState = this.setNameValidationState.bind(this)
    }

    public checkout(props: any): void {

        if (this.isValid()) {

            this.props.cartActionController && this.props.cartActionController.clearCart();
            props.history.push("/Menu")
        }
    }

    private isValid(): boolean {

        return this.state.cardNumberIsValid && this.state.nameIsValid;
    }

    public static mapStateToProps(state: ApplicationModelState): any {

        return {

            cart: state.cart
        }
    }

    public static mapDispatchToProps(dispatch: Dispatch): any {

        return {

            cartActionController: new CartActionController(dispatch)
        }
    }

    private onChangeCardNumber(event: FormEvent<HTMLInputElement>): void {

        this.setState({ cardNumber: event.currentTarget.value });
    }

    private onChangeName(event: FormEvent<HTMLInputElement>): void {

        this.setState({ name: event.currentTarget.value });
    }

    public render(): ReactNode {

        let SubmitButton = this.props.cart && this.props.cart.entries.length && this.isValid() ? withRouter( (props) => <input type="button" value="Submit" onClick={ () => this.checkout(props) } /> ) : () => null;

        return (
            <div>
                <h1>Checkout</h1>
                <CartList />
                <form>
                    <Validator className="cc-form-errors" value={ this.state.name } isRequired={ true } renderOnEmpty={ true } constraint={ /^[A-Za-z][a-z]+( [A-Za-z]\.?)? [A-Za-z][a-z]+/ } currentState={ this.state.nameIsValid } notify={ this.setNameValidationState }>Provide a first and last name with initial capital letters, an uppercase middle intitial is permitted.</Validator><br />
                    <Validator className="cc-form-errors" value={ this.state.cardNumber } isRequired={ true } renderOnEmpty={ true } constraint={ [ /^\d{12,19}$/, cardNumberValidator ] } currentState={ this.state.cardNumberIsValid } notify={ this.setCardNumberValidationState }>Please enter a valid card number.</Validator><br />
                    <div className="cc-form">
                        <div className="cc-form-row">
                            <div className="cc-form-label"><label className="cc-form-label">Name:</label></div>
                            <div className="cc-form-field"><input type="text" className={ 'cc-form-field ' + ( this.state.nameIsValid ? 'cc-form-field-requirement-met' : 'cc-form-field-required' ) } value={ this.state.name } onChange={ this.onChangeName } /></div>
                            <div className="clear-all"></div>
                        </div>
                        <div className="cc-form-row">
                            <div className="cc-form-label"><label className="cc-form-label">Card Number:</label></div>
                            <div className="cc-form-field"><input type="text" className={ 'cc-form-field ' + ( this.state.cardNumberIsValid ? 'cc-form-field-requirement-met' : 'cc-form-field-required' ) } value={ this.state.cardNumber } onChange={ this.onChangeCardNumber } /></div>
                            <div className="clear-all"></div>
                        </div>
                        <div className="cc-form-row">
                            <div className="cc-form-label"></div>
                            <div className="cc-form-field">
                                <Link to="/Menu"><button>Cancel</button></Link>&nbsp;
                                <SubmitButton />
                            </div>
                            <div className="clear-all"></div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    public setCardNumberValidationState(valid: boolean): void {

        if (this.state.cardNumberIsValid !== valid) {
        
            this.setState( { cardNumberIsValid: valid } );
        }
     }

    public setNameValidationState(valid: boolean): void {

        if (this.state.nameIsValid !== valid) {
        
            this.setState( { nameIsValid: valid } );
        }
    }
}

// See the comment in the header about using connect vs the @connect decorator in TypeScript.

export default connect(Checkout.mapStateToProps, Checkout.mapDispatchToProps)(Checkout);