import React from 'react';
import ConversationAlert from '../../packages/module/src/ConversationAlert';

describe('ConversationAlert', () => {
  it('renders assistant conversation alert', () => {
    cy.mount(<ConversationAlert title='You can start a new conversation at any time by typing below.'/>);

    cy.get('.pf-v6-c-alert__title').first().should('contain', 'You can start a new conversation at any time by typing below.');
    cy.get('.pf-v6-c-alert__icon').first().should('exist');
  })
})
