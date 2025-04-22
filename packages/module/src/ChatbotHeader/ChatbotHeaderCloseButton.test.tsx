import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ChatbotHeaderCloseButton } from './ChatbotHeaderCloseButton';
import '@testing-library/jest-dom';

describe('ChatbotHeaderCloseButton', () => {
  it('should render ChatbotHeaderCloseButton', () => {
    const { container } = render(
      <ChatbotHeaderCloseButton className="custom-header-close-button" onClick={jest.fn()} />
    );

    expect(container.querySelector('.custom-header-close-button')).toBeTruthy();
  });

  it('should call onClick handler when close button is pressed', () => {
    const onClick = jest.fn();
    render(<ChatbotHeaderCloseButton className="custom-header-close-button" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('should render button with isCompact', () => {
    render(<ChatbotHeaderCloseButton data-testid="close-button" onClick={jest.fn()} isCompact />);
    expect(screen.getByTestId('close-button')).toHaveClass('pf-m-compact');
  });
});
