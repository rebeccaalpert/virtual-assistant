import React from 'react';
import VirtualAssistantAction from '@patternfly/virtual-assistant/src/VirtualAssistantAction';
import { AngleDownIcon } from '@patternfly/react-icons';

describe('VirtualAssistantAction', () => {
  it('renders assistant action', () => {
    cy.mount(<VirtualAssistantAction aria-label="Minimize virtual assistant" onClick={cy.stub().as('action')}>
      <AngleDownIcon/>
    </VirtualAssistantAction>);
    cy.get('[aria-label="Minimize virtual assistant"]').click();
    cy.get('@action').should('have.been.called');
    cy.get('.pf-v5-svg').should('exist');
  })
})