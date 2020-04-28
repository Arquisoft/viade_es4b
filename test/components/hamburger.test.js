import {render} from "react-testing-library";
import HamburgerButton from "../../src/components/NavBar/children/HamburgerButton/hamburger.component";
import React from "react";

describe('HamburgerButton', () => {
    const { container, getByTestId } = render(
        <HamburgerButton />
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    test('renders the actual button', () => {
        expect(getByTestId('button')).toBeTruthy();
    });

});