import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatbotHeaderActions from './ChatbotHeaderActions';

describe('ChatbotHeaderActions', () => {
  it('should render ChatbotHeaderActions with children', () => {
    render(<ChatbotHeaderActions>Chatbot Header</ChatbotHeaderActions>);
    expect(screen.getByText('Chatbot Header')).toBeTruthy();
  });

  it('should render ChatbotHeaderActions with custom classname', () => {
    const { container } = render(
      <ChatbotHeaderActions className="custom-header-action-class">Chatbot Content</ChatbotHeaderActions>
    );
    expect(container.querySelector('.custom-header-action-class')).toBeTruthy();
  });
});
