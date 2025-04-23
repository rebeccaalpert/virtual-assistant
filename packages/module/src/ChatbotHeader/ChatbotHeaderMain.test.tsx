import { render, screen } from '@testing-library/react';
import ChatbotHeaderMain from './ChatbotHeaderMain';

describe('ChatbotHeaderMain', () => {
  it('should render ChatbotHeaderMain with children', () => {
    render(<ChatbotHeaderMain>Chatbot Header Main</ChatbotHeaderMain>);
    expect(screen.getByText('Chatbot Header Main')).toBeTruthy();
  });

  it('should render ChatbotHeaderMain with custom classname', () => {
    const { container } = render(
      <ChatbotHeaderMain className="custom-header-class">Chatbot Content</ChatbotHeaderMain>
    );
    expect(container.querySelector('.custom-header-class')).toBeTruthy();
  });
});
