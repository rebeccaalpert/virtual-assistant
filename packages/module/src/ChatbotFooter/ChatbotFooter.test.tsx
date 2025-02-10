import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatbotFooter from './ChatbotFooter';

describe('ChatbotFooter', () => {
  it('should render ChatbotFooter with children', () => {
    render(<ChatbotFooter>Chatbot Content</ChatbotFooter>);
    expect(screen.getByText('Chatbot Content')).toBeTruthy();
  });

  it('should render ChatbotFooter with custom classname', () => {
    const { container } = render(<ChatbotFooter className="custom-class">Chatbot Content</ChatbotFooter>);
    expect(container.querySelector('.custom-class')).toBeTruthy();
  });
});
