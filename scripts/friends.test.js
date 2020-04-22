import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import { render, cleanup } from 'react-testing-library'
import Friends from '../src/containers/Amigos/MisAmigos.js'

describe('Friends', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <Friends/>
        </Router>
    )

    test('Los friends se renderizan sin problema', () => {
        expect(container).toBeTruthy()
    })
})