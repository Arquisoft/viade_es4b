import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Image from '../../src/containers/Imagen/imagen.component';

import 'jest-dom/extend-expect';

describe('Image', () => {
    afterAll(cleanup);

    const { container } = render(<Image/>);

    test('renders without crashing', () => {
        expect(container).toBeTruthy();
    });
});