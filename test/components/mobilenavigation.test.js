import {render} from "react-testing-library";
import MobileNav from "../../src/components/NavBar/children/MobileNavigation/mobile.navigation.component";
import React from "react";

describe('MobileNav', () => {
    const { container, getByTestId } = render(
        <MobileNav />
    );

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    test('renders 1 div', () => {
        expect(getByTestId('div')).toBeTruthy();
    });

    test('renders 1 button', () => {
        expect(getByTestId('button')).toBeTruthy();
    });
});