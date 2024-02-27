import React from 'react'
import FormCancha from './FormCancha'

describe('<FormCancha />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FormCancha />)
  })
})