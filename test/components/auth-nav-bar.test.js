import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import AuthNavBar from "../../src/components/AuthNavBar/auth-nav-bar.component";

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('AuthNavBar', () => {
  act(() => {
    ReactDOM.render(<Router>
      <AuthNavBar />
    </Router>, container)
  })

  expect(container).toBeTruthy()
})
