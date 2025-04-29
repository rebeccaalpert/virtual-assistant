import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MessageBox } from './MessageBox';
import userEvent from '@testing-library/user-event';

describe('MessageBox', () => {
  it('should render Message box', () => {
    render(
      <MessageBox>
        <>Chatbot Messages</>
      </MessageBox>
    );
    expect(screen.getByText('Chatbot Messages')).toBeTruthy();
  });

  it('should assign ref to Message box', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <MessageBox ref={ref}>
        <div>Test message content</div>
      </MessageBox>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
  it('should call onScrollToBottomClick when scroll to top button is clicked', async () => {
    const spy = jest.fn();
    render(
      <MessageBox onScrollToBottomClick={spy}>
        <div>Test message content</div>
      </MessageBox>
    );

    // this forces button to show
    const region = screen.getByRole('region');
    Object.defineProperty(region, 'scrollHeight', { configurable: true, value: 1000 });
    Object.defineProperty(region, 'clientHeight', { configurable: true, value: 500 });
    Object.defineProperty(region, 'scrollTop', { configurable: true, value: 0 });
    region.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /Jump bottom button/i }));
      expect(spy).toHaveBeenCalled();
    });
  });
  it('should call onScrollToTopClick when scroll to top button is clicked', async () => {
    const spy = jest.fn();
    render(
      <MessageBox onScrollToTopClick={spy}>
        <div>Test message content</div>
      </MessageBox>
    );

    // this forces button to show
    const region = screen.getByRole('region');
    Object.defineProperty(region, 'scrollHeight', { configurable: true, value: 1000 });
    Object.defineProperty(region, 'clientHeight', { configurable: true, value: 500 });
    Object.defineProperty(region, 'scrollTop', {
      configurable: true,
      value: 500
    });
    region.dispatchEvent(new Event('scroll'));

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /Jump top button/i }));
      expect(spy).toHaveBeenCalled();
    });
  });
});
