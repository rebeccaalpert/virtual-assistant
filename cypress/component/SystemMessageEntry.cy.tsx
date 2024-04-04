import React from 'react';
import SystemMessageEntry from '@patternfly/virtual-assistant/src/SystemMessageEntry';

describe('SystemMessageEntry', () => {
  it('renders assistant system message entry', () => {
    cy.mount(<SystemMessageEntry>Some text</SystemMessageEntry>);

    cy.get('[data-test-id="assistant-system-message-entry"]').first().should('contain', 'Some text');
  })
})