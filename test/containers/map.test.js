import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import { render, cleanup } from 'react-testing-library'
import GoogleMap from '../../src/containers/Mapa/mapComponent'

describe('Google Map', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <GoogleMap/>
        </Router>
    );

    test('El mapa se renderizar sin problema', () => {
        expect(container).toBeTruthy()
    })
});