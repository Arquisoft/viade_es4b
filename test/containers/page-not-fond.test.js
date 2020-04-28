import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import PageNotFound from '../../src/containers/PageNotFound/page-not-found.component';
import 'jest-dom/extend-expect';

describe('Page Not Found', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <PageNotFound />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });

  test('includes link to homepage', () => {
    const idsLink = document.querySelector('.ids-link');

    expect(idsLink).toBeTruthy();
  });

  test('renders title properly', () => {
    expect(container).toBeInTheDocument('<h3>{t(\'notFound.title\')}</h3>');
  });

  test('rendering second video', () => {
    const image = document.querySelector('.image');
    expect(image).toBeTruthy();
  });

});