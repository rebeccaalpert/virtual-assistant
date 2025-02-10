import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ChatbotAlert from './ChatbotAlert';

describe('ChatbotAlert', () => {
  it('should render ChatbotAlert with default variant', () => {
    render(<ChatbotAlert title="Chatbot Alert" />);
    expect(screen.getByText('Chatbot Alert')).toBeTruthy();
  });

  it('should render ChatbotAlert with children', () => {
    render(<ChatbotAlert title="Chatbot Alert">Chatbot Alert Content</ChatbotAlert>);
    expect(screen.getByText('Chatbot Alert Content')).toBeTruthy();
  });

  it('should call onClose handler when onClose button is clicked', () => {
    const onCloseHandler = jest.fn();
    render(
      <ChatbotAlert title="Chatbot Alert" onClose={onCloseHandler}>
        Chatbot Alert Content
      </ChatbotAlert>
    );

    expect(screen.getByText('Chatbot Alert')).toBeTruthy();
    expect(screen.getByText('Chatbot Alert Content')).toBeTruthy();

    // click on the close button
    fireEvent.click(screen.getByRole('button'));
    expect(onCloseHandler).toHaveBeenCalled();
  });
});
