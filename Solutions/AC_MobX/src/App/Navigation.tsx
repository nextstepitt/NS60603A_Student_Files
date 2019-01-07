// Navigation.jsx
// Copyright © 2018 NextStep IT Training. All rights reserved.
//
// Navigation renders the menu bar underneath the banner of the application: the buttons that allow
// the user to move from view to view. The bar must be re-rendered each time, because the props can
// change. There is an incentive to merely use a closure because it needs to be wrapped by withBrowser,
// but that would be a mistake. The closure would be re-created every time the user preses a menu
// button, and why? We would get exatly the same JSX. So, the JSX as been moved into a method.
//

import { History } from 'history';
import { action } from 'mobx';
import React, { Component, ReactElement, ReactNode } from 'react';
import { withRouter } from 'react-router';

interface NavigationProps {

}

class Navigation extends Component<NavigationProps> {

	private history: History | null = null;

	@action.bound
	public createNavigationBar(props: any): ReactElement<any> {

		// createNavigationBar is called multiple times, but making it a method removes re-creating a closure each
		// of those times.

		this.history = props.history;
		
		// This example uses history on purpose to demonstrate using the push method.

		return (
			<div className="navigation">
				<button className={ `${ props.location.pathname === '/' ? 'navbutton-selected' : 'navbutton' }` }
					onClick={ this.pushHome }>Home</button>
				<button className={ `${ props.location.pathname === '/menu' ? 'navbutton-selected' : 'navbutton' }` }
					onClick={ this.pushMenu }>Menu</button>
				<button className={ `${ props.location.pathname === '/checkout' ? 'navbutton-selected' : 'navbutton' }` }
					onClick={ this.pushCheckout }>Checkout</button>
			</div>
		)

		// Alternative form using Link instead of history and calling onClick. This is probably what we would have gone
		// with in a read application:

		/*
		return (
			<div className="navigation">
				<Link to="/"><button className={ `${ props.location.pathname === '/' ? 'navbutton-selected' : 'navbutton' }` }>Home</button></Link>
				<Link to="/menu"<button className={ `${ props.location.pathname === '/menu' ? 'navbutton-selected' : 'navbutton' }` }>Menu</button></Link>
				<Link to="/checkout"><button className={ `${ props.location.pathname === '/checkout' ? 'navbutton-selected' : 'navbutton' }` }>Checkout</button></Link>
			</div>
		)
		*/
	}

    public render(): ReactNode {

		// NavWithRouter is assigned to a local variable because this.NavWithRouter is not acceptable
		// as a tag name in JSX.

		const NavWithRouter = withRouter(this.createNavigationBar);

		return <NavWithRouter />
	}
	
	@action.bound
	public pushHome(): void {

		this.history!.push('/')
	}

	@action.bound
	public pushMenu(): void {

		this.history!.push('/menu')
	}

	@action.bound
	public pushCheckout(): void {

		this.history!.push('/checkout')
	}
}

export default Navigation;