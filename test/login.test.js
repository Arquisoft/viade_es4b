import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import { render, cleanup } from 'react-testing-library'
import Login from '../src/containers/Login/login.component'

describe('Login', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <Login/>
        </Router>
    )

    test('El login se renderiza sin problema', () => {
        expect(container).toBeTruthy()
    })
})