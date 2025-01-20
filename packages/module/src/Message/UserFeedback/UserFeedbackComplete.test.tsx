import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UserFeedbackComplete from './UserFeedbackComplete';

describe('UserFeedbackComplete', () => {
  it('should render correctly', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" />);
    expect(screen.getByText('Thank you')).toBeTruthy();
    screen.getByText(/You have successfully sent your feedback!/i);
    screen.getByText(/Thank you for responding./i);
    expect(screen.queryByRole('button', { name: /Close/i })).toBeFalsy();
  });
  it('should render different title correctly', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" title="Thanks!" />);
    expect(screen.getByText('Thanks!')).toBeTruthy();
    screen.getByText(/You have successfully sent your feedback!/i);
    screen.getByText(/Thank you for responding./i);
  });
  it('should render different string body correctly', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" body="Feedback received!" />);
    expect(screen.getByText('Thank you')).toBeTruthy();
    screen.getByText(/Feedback received!/i);
  });
  it('should render different node body correctly', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" body={<div>Feedback received!</div>} />);
    expect(screen.getByText('Thank you')).toBeTruthy();
    screen.getByText(/Feedback received!/i);
  });
  it('should handle onClose correctly', async () => {
    const spy = jest.fn();
    render(<UserFeedbackComplete timestamp="12/12/12" onClose={spy} />);
    const closeButton = screen.getByRole('button', { name: 'Close feedback for message received at 12/12/12' });
    expect(closeButton).toBeTruthy();
    await userEvent.click(closeButton);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should be able to change close button aria label', () => {
    const spy = jest.fn();
    render(<UserFeedbackComplete timestamp="12/12/12" onClose={spy} closeButtonAriaLabel="Ima button" />);
    expect(screen.getByRole('button', { name: /Ima button/i })).toBeTruthy();
  });
  it('should handle className', async () => {
    render(<UserFeedbackComplete timestamp="12/12/12" className="test" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('test');
  });
  it('should apply id', async () => {
    render(<UserFeedbackComplete timestamp="12/12/12" id="test" data-testid="card" />);
    expect(screen.getByTestId('card').parentElement).toHaveAttribute('id', 'test');
  });
  it('renders with no timeout by default', () => {
    jest.useFakeTimers();
    render(<UserFeedbackComplete timestamp="12/12/12" />);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(screen.getByText('Thank you')).toBeVisible();
    jest.useRealTimers();
  });
  it('should handle timeout correctly after 8000ms when timeout = true', async () => {
    jest.useFakeTimers();
    render(<UserFeedbackComplete timestamp="12/12/12" timeout />);
    act(() => {
      jest.advanceTimersByTime(7999);
    });
    expect(screen.getByText('Thank you')).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByText('Thank you')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
  it('should handle timeout correctly when timeout = numeric value', async () => {
    jest.useFakeTimers();
    render(<UserFeedbackComplete timestamp="12/12/12" timeout={300} />);
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(screen.getByText('Thank you')).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByText('Thank you')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
  it('does not get removed on timeout if the user is focused on the card', async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay)
    });
    jest.useFakeTimers();
    render(<UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" />);
    expect(screen.getByText('Thank you')).toBeTruthy();
    await user.click(screen.getByTestId('card'));
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(screen.getByText('Thank you')).toBeTruthy();
    jest.useRealTimers();
  });
  it('does not remove the card on timeout if the user is hovered over it', async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay)
    });
    jest.useFakeTimers();
    render(<UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" />);
    const card = screen.getByTestId('card');
    await user.hover(card);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(card).toBeVisible();
    jest.useRealTimers();
  });
  it('removes the card after the user removes focus from the card and 3000ms have passed', async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay)
    });
    jest.useFakeTimers();
    render(
      <div>
        <input />
        <UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" />
      </div>
    );
    const card = screen.getByTestId('card');
    await user.click(card);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    await user.click(screen.getByRole('textbox'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Thank you')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('removes the card after the user removes hover from the card and 3000ms have passed', async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay)
    });
    jest.useFakeTimers();
    render(
      <div>
        <input />
        <UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" />
      </div>
    );
    const card = screen.getByTestId('card');
    await user.hover(card);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    await user.hover(screen.getByRole('textbox'));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Thank you')).not.toBeInTheDocument();
    jest.useRealTimers();
  });

  it('removes the card after the user removes hover from the card and timeoutAnimation time has passed', async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay)
    });
    jest.useFakeTimers();
    render(
      <div>
        <input />
        <UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" timeoutAnimation={1000} />
      </div>
    );
    const card = screen.getByTestId('card');
    await user.hover(card);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    await user.hover(screen.getByRole('textbox'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Thank you')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
  it('does not call the onTimeout callback before the timeout period has expired', () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(<UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" onTimeout={spy} />);
    act(() => {
      jest.advanceTimersByTime(7999);
    });
    expect(spy).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
  it('calls the onTimeout callback after the timeout period has expired', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    render(<UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" onTimeout={spy} />);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(spy).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('renders without aria-live and aria-atomic attributes by default', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" />);
    const card = screen.getByTestId('card').parentElement;
    expect(card).not.toHaveAttribute('aria-live');
    expect(card).not.toHaveAttribute('aria-atomic');
  });

  it('has an aria-live value of polite and aria-atomic value of false when isLiveRegion = true', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" timeout data-testid="card" isLiveRegion />);
    const card = screen.getByTestId('card').parentElement;
    expect(card).toHaveAttribute('aria-live', 'polite');
    expect(card).toHaveAttribute('aria-atomic', 'false');
  });
  it('calls onMouseEnter appropriately', async () => {
    const spy = jest.fn();
    const user = userEvent.setup();
    render(
      <div>
        <input />
        <UserFeedbackComplete timestamp="12/12/12" data-testid="card" onMouseEnter={spy} />
      </div>
    );
    const card = screen.getByTestId('card');
    expect(spy).toHaveBeenCalledTimes(0);
    await user.hover(card);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('calls onMouseLeave appropriately', async () => {
    const spy = jest.fn();
    const user = userEvent.setup();
    render(
      <div>
        <input />
        <UserFeedbackComplete timestamp="12/12/12" data-testid="card" onMouseLeave={spy} />
      </div>
    );
    const card = screen.getByTestId('card');
    expect(spy).toHaveBeenCalledTimes(0);
    await user.hover(card);
    await user.hover(screen.getByRole('textbox'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should focus on load by default', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" data-testid="card" />);
    expect(screen.getByTestId('card').parentElement).toHaveFocus();
  });
  it('should not focus on load if focusOnLoad = false', () => {
    render(<UserFeedbackComplete timestamp="12/12/12" data-testid="card" focusOnLoad={false} />);
    expect(screen.getByTestId('card').parentElement).not.toHaveFocus();
  });
});
