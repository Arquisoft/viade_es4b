import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ProviderItem from '../../src/containers/Register/children/ProviderItem/provider.item.component';

import 'jest-dom/extend-expect';

library.add(fas);

describe('ProviderItem', () => {
  afterAll(cleanup);

  const data = {
    label: 'Inrupt',
    image: '/viade_es4b/img/inrupt.svg',
    value: 'https://inrupt.net/auth',
    registerLink: 'https://inrupt.net/register',
    description: 'Lorem ipsum dolor sit amet non ipsom dolor'
  };

  const { container, getByTestId } = render(<ProviderItem data={data} />);

  test('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
  test('renders with styled components', () => {
    expect(getByTestId('provider-item')).toBeTruthy();
    expect(document.querySelector('.provider-item')).toBeTruthy();
  });

  test('rendering item properly', () => {
    const label = document.querySelector('.label');
    expect(label).toHaveTextContent('Inrupt');
  });
});
