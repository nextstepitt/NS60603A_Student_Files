// Checkout.tsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//

import { action } from 'mobx';
import { observer, inject } from 'mobx-react';
import React, { Component, FormEvent, ReactNode } from 'react';
import Validator from 'react-data-validator';
import { Link, withRouter } from 'react-router-dom';

import '../assets/styles/application.css';
import Cart from '../cart/Cart';
import CartList from './CartList';

interface CheckoutProps {

    cart?: Cart;
}

class CheckoutState {

    public cardNumber: string = '';
    public cardNumberIsValid: boolean = true;
    public error: boolean = false;
    public name: string = '';
    public nameIsValid: boolean = true;
}

@inject('cart')
@observer
class Checkout extends Component<CheckoutProps, CheckoutState> {

    public readonly state = new CheckoutState();
    private cardNumberIsValid: boolean = true;
    private nameIsValid: boolean = true;

    @action.bound
    public checkout(props: any): void {

        if (this.isValid()) {

            this.props.cart!.clear();
            props.history.push("/Menu")
        }

        this.setState({ error: true });
    }

    public componentDidMount(): void {

        this.setValidState();
    }

    public componentDidUpdate(props: CheckoutProps, state: CheckoutState): void {

        this.setValidState();
    }

    public isValid(): boolean {

        return this.state.cardNumberIsValid && this.state.nameIsValid;
    }

    @action.bound
    public onCardNumberInvalid(): void {

        this.cardNumberIsValid = false;
     }

     @action.bound
    public onChangeCardNumber(event: FormEvent<HTMLInputElement>): void {

        this.setState({ cardNumber: event.currentTarget.value });
    }

    @action.bound
    public onChangeName(event: FormEvent<HTMLInputElement>): void {

        this.setState({ name: event.currentTarget.value });
    }

    @action.bound
    public onNameInvalid(): void {

        this.nameIsValid = false
    }

    public render(): ReactNode {

        this.cardNumberIsValid = true;
        this.nameIsValid = true;

        let result: ReactNode | null = null;

        const SubmitButton = this.props.cart!.entries.length && this.isValid() ? withRouter( (props) => <input type="button" value="Submit" onClick={ () => this.checkout(props) } /> ) : () => null;
        
        return (
            <div>
                <h1>Checkout</h1>
                <CartList />
                <form>
                    <Validator className="cc-form-errors" value={ this.state.name } isRequired={ true } renderOnEmpty={ true } constraint={ /^[A-Za-z][a-z]+( [A-Za-z]\.?)? [A-Za-z][a-z]+/ } notify={ this.onNameInvalid }>Provide a first and last name with initial capital letters, an uppercase middle intitial is permitted.</Validator><br />
                    <Validator className="cc-form-errors" value={ this.state.cardNumber } isRequired={ true } renderOnEmpty={ true } constraint={ /^\d{12,19}$/ } notify={ this.onCardNumberInvalid }>Please enter a valid card number.</Validator><br />
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

    public setValidState(): void {

        // Check to see if the state is valid or not, and indicate through the component state
        // the results.

        if (this.state.cardNumberIsValid !== this.cardNumberIsValid ||
            this.state.nameIsValid !== this.nameIsValid) {

            this.setState({
                cardNumberIsValid: this.cardNumberIsValid,
                nameIsValid: this.nameIsValid
            });
        }
    }
}

export default Checkout