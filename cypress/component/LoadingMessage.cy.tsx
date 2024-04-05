import React from 'react';
import LoadingMessage from '../../packages/module/src/LoadingMessage';
import GrinIcon from '@patternfly/react-icons/dist/js/icons/grin-icon';

describe('LoadingMessage', () => {
  it('renders default loading message', () => {
    cy.mount(<LoadingMessage />);

    cy.get('[data-test-id="assistant-loading-icon"]').should('have.length', 1);
    cy.get('[data-test-id="assistant-loading-dots"]').should('have.length', 1);
  })

  it('renders custom loading message', () => {
    cy.mount(<LoadingMessage icon={GrinIcon} />);

    cy.get('[data-test-id="assistant-loading-icon"]').should('have.length', 1);
    cy.get('[data-test-id="assistant-loading-dots"]').should('have.length', 1);
  })
})

