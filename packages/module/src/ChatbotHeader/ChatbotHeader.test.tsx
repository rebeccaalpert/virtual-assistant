import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatbotHeader from './ChatbotHeader';

describe('ChatbotHeader', () => {
  it('should render ChatbotHeader with children', () => {
    render(<ChatbotHeader>Chatbot Header</ChatbotHeader>);
    expect(screen.getByText('Chatbot Header')).toBeTruthy();
  });

  it('should render ChatbotHeader with custom classname', () => {
    const { container } = render(<ChatbotHeader className="custom-header-class">Chatbot Content</ChatbotHeader>);
    expect(container.querySelector('.custom-header-class')).toBeTruthy();
  });
});
