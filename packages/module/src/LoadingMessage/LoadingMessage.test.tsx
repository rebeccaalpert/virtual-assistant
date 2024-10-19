import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingMessage from './LoadingMessage';

describe('LoadingMessage', () => {
  it('should render file drop zone', () => {
    const { container } = render(<LoadingMessage />);
    expect(container).toMatchSnapshot();
  });
  it('should render children', () => {
    render(<LoadingMessage />);
    expect(screen.getByTestId('assistant-loading-dots')).toBeTruthy();
  });
});
