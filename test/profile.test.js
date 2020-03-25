import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import { render, cleanup } from 'react-testing-library'
import Profile from '../src/containers/Profile/profile.container'

describe('Profile', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <Profile/>
        </Router>
    )

    test('El perfil se renderiza sin problema', () => {
        expect(container).toBeTruthy()
    })
})