import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Ayuda from '../../src/containers/Ayuda/ayudaComponent';

import 'jest-dom/extend-expect';

describe('Ayuda', () => {
    afterAll(cleanup);

    const { container } = render(<Ayuda />);

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
    test('renders with styled components', () => {
        const helpPage = document.querySelector('.ayuda-Component');
        expect(helpPage).toBeTruthy();
    });

    test('renders title properly', () => {
        expect(container).toBeInTheDocument('<h1>Guía de la aplicación</h1>');
    });

    test('rendering first video', () => {
        const image = document.querySelector('.video1');
        expect(image).toBeTruthy();
    });

    test('rendering second video', () => {
        const image = document.querySelector('.video2');
        expect(image).toBeTruthy();
    });
});