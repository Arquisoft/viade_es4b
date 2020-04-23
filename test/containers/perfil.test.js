import React from 'react'
import { BrowserRouter as Router} from "react-router-dom"
import { render, cleanup } from 'react-testing-library'
import Perfil from '../../src/containers/Perfil/perfil.container'

describe('Perfil', () => {
    afterAll(cleanup);

    const { container } = render(
        <Router>
            <Perfil/>
        </Router>
    )

    test('El perfil se renderiza sin problema', () => {
        expect(container).toBeTruthy()
    })

})