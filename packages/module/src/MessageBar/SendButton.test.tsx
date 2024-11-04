import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { SendButton } from './SendButton';

const renderSend = (props?: { [key: string]: string }) => {
  const spy = jest.fn();
  render(<SendButton onClick={spy} {...props} />);
};
describe('Send button', () => {
  it('should render button correctly', () => {
    renderSend();
    expect(screen.getByRole('button', { name: 'Send button' })).toBeTruthy();
  });
  it('should handle onClick correctly', async () => {
    const spy = jest.fn();
    render(<SendButton onClick={spy} />);
    await userEvent.click(screen.getByRole('button', { name: 'Send button' }));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should handle className prop', () => {
    renderSend({ className: 'test' });
    expect(screen.getByRole('button', { name: 'Send button' })).toHaveClass('test');
  });

  it('should handle spread props, including aria-label', () => {
    renderSend({ 'aria-label': 'test' });
    expect(screen.getByRole('button', { name: 'test' }));
  });
});
