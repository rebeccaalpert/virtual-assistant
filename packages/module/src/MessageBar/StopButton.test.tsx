import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { StopButton } from './StopButton';

const renderSend = (props?: { [key: string]: string }) => {
  const spy = jest.fn();
  render(<StopButton onClick={spy} {...props} />);
};
describe('Stop button', () => {
  it('should render button correctly', () => {
    renderSend();
    expect(screen.getByRole('button', { name: 'Stop button' })).toBeTruthy();
  });
  it('should handle onClick correctly', async () => {
    const spy = jest.fn();
    render(<StopButton onClick={spy} />);
    await userEvent.click(screen.getByRole('button', { name: 'Stop button' }));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should handle className prop', () => {
    renderSend({ className: 'test' });
    expect(screen.getByRole('button', { name: 'Stop button' })).toHaveClass('test');
  });

  it('should handle spread props, including aria-label', () => {
    renderSend({ 'aria-label': 'test' });
    expect(screen.getByRole('button', { name: 'test' }));
  });
});
