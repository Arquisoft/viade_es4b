import React from 'react';

type Props = {
  toggleMobileMenu: Function
};

const HamburgerButton = ({ toggleMobileMenu }: Props) => (
  <div className="mobile-navigation__toggle">
    <button onClick={toggleMobileMenu} type="button" data-testid="button">
      <span className="icon">
        <img src="/viade_es4b/img/bars-nav.svg" alt="Icon Menu" />
      </span>
    </button>
  </div>
);

export default HamburgerButton;
