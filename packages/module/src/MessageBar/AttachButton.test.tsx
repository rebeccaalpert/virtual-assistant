import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AttachButton } from './AttachButton';

describe('Attach button', () => {
  it('should render button correctly', () => {
    render(<AttachButton />);
    expect(screen.getByRole('button', { name: 'Attach button' })).toBeTruthy();
  });
  it('should handle isDisabled prop', () => {
    render(<AttachButton isDisabled />);
    expect(screen.getByRole('button', { name: 'Attach button' })).toBeDisabled();
  });
  it('should handle spread props, including aria-label', () => {
    render(<AttachButton aria-label="test" />);
    expect(screen.getByRole('button', { name: 'test' }));
  });
  it('should handle onClick', async () => {
    const spy = jest.fn();
    render(<AttachButton onClick={spy} />);
    await userEvent.click(screen.getByRole('button', { name: 'Attach button' }));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should handle className prop', () => {
    render(<AttachButton className="test" />);
    expect(screen.getByRole('button', { name: 'Attach button' })).toHaveClass('test');
  });
});
