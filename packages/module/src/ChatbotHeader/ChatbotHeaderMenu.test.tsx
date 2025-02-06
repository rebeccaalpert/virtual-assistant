import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ChatbotHeaderMenu } from './ChatbotHeaderMenu';

describe('ChatbotHeaderMenu', () => {
  it('should render ChatbotHeaderMenu with custom class', () => {
    const { container } = render(<ChatbotHeaderMenu className="custom-header-menu" onMenuToggle={jest.fn()} />);

    expect(container.querySelector('.custom-header-menu')).toBeTruthy();
  });

  it('should call onMenuToggle when ChatbotHeaderMenu button is clicked', () => {
    const onMenuToggle = jest.fn();
    render(<ChatbotHeaderMenu className="custom-header-menu" onMenuToggle={onMenuToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle menu' }));

    expect(onMenuToggle).toHaveBeenCalled();
  });
});
