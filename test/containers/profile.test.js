import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import { render, cleanup } from 'react-testing-library'
import Profile from '../../src/containers/Profile/profile.container'

import 'jest-dom/extend-expect';

describe('Profile', () => {
    afterAll(cleanup);

    const { container, getByTestId } = render(
        <Router>
            <Profile/>
        </Router>
    )

    test('El perfil se renderiza sin problema', () => {
        expect(container).toBeTruthy()
    })

    test('renders with styled components', () => {
        const profileWrapper = document.querySelector('.profile-wrapper');
        expect(profileWrapper).toBeTruthy();
    });

})