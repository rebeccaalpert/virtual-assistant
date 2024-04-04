describe('Test the Virtual assistant docs page', () => {
  it('renders a basic example', () => {
    cy.visit('http://localhost:8006/extensions/virtual-assistant/about-virtual-assistant');
    cy.wait(1000);
    cy.get('a[href="/extensions/virtual-assistant/virtual-assistant"]').click();
    cy.wait(1000);

    cy.get('[data-test-id="assistant-title"]').first().should('contain', 'Virtual Assistant');
    cy.get('[data-test-id="assistant-text-input"]').first().should('have.attr', 'placeholder', 'Type a message...');
    cy.get('[data-test-id="assistant-send-button"]').first().should('not.be.disabled');
  })

  it('renders a customized title and placeholder', () => {
    cy.visit('http://localhost:8006/extensions/virtual-assistant/virtual-assistant');
    cy.wait(1000);

    cy.get('[data-test-id="assistant-title"]').eq(1).should('contain', 'PatternFly assistant');
    cy.get('[data-test-id="assistant-text-input"]').eq(1).should('have.attr', 'placeholder', 'You can ask anything in here.');
    cy.get('[data-test-id="assistant-send-button"]').eq(1).should('not.be.disabled');
  })

  it('renders listening to messages', () => {
    cy.visit('http://localhost:8006/extensions/virtual-assistant/virtual-assistant');
    cy.wait(1000);

    cy.get('[data-test-id="assistant-example-message"]').should('contain', 'Last received message: ');
    cy.get('[data-test-id="assistant-text-input"]').eq(2).type('my message');
    cy.get('[data-test-id="assistant-send-button"]').eq(2).click({ force: true });
    cy.get('[data-test-id="assistant-example-message"]').should('contain', 'Last received message: my message');
  })

  it('renders header with disabled send button', () => {
    cy.visit('http://localhost:8006/extensions/virtual-assistant/virtual-assistant', { onBeforeLoad: (win) => {cy.stub(win.console, 'log').as('consoleLog');}, });
    cy.wait(1000);
    cy.get('[data-test-id="assistant-send-button"]').eq(3).should('be.disabled');
  })

  it('renders header with actions', () => {
    cy.visit('http://localhost:8006/extensions/virtual-assistant/virtual-assistant', { onBeforeLoad: (win) => {cy.stub(win.console, 'log').as('consoleLog');}, });
    cy.wait(1000);
    cy.get('[aria-label="Minimize virtual assistant"]').click({ force: true });
    cy.wait(1000);
    cy.get('@consoleLog').should('be.calledWith', 'Minimize button clicked');
  })
})