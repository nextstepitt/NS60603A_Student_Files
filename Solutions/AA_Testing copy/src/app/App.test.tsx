import Enzyme, { render, mount } from 'enzyme'
import React from 'react';
import ReactDOM from 'react-dom';
import TestRenderer from 'react-test-renderer';
import App from './App';

it('renders without crashing', () => {

    const div = document.createElement('div');

    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders the snapshot hierarchy', () => {

    const currentView = TestRenderer.create(<App />).toJSON()

    expect(currentView).toMatchSnapshot()
})

it('The selected navbutton is Home', () => {

    const testRenderer = TestRenderer.create(<App />)
    const testInstance = testRenderer.root
    const component = testInstance.findByProps({ className: 'navbutton-selected' })

    expect(component.children).toEqual(['Home'])
})

it('Moves to the checkout view when the navbutton button is clicked', () => {

    Enzyme.configure({ adapter: new Adapter() })

    // Mount the tree (jsdom) and look for the checkout Button

    const wrapper = mount(<App />)
    const checkoutButton = wrapper.find({ id: 'checkout-button' })

    expect(checkoutButton).not.toBeNull()

    // Now click the button and make sure the h1 tag with "Checkout" is visible

    checkoutButton.simulate('click')

    const title = wrapper.find('h1')

    expect(title.text()).toEqual('Checkout')
})