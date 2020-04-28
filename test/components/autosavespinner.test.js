import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import AutoSaveSpinner from '../../src/components/AutoSaveSpinner/index';

afterAll(cleanup);

describe.only('AutoSaveSpinner', () => {
    const { container, rerender } = render(
        <Router>
            <AutoSaveSpinner />
        </Router>
    );

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });


});