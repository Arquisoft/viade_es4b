import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { HashRouter as Router } from 'react-router-dom';
import Footer from "../../src/components/Footer/footer.component";

afterAll(cleanup);

describe.only("Nav Bar", () => {
  const { container } = render(
    <Router>
      <Footer />
    </Router>
  );

  it("renders without crashing", () => {
    expect(container).toBeTruthy();
  });
});