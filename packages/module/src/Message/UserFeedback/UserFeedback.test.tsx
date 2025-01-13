import React from 'react';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UserFeedback from './UserFeedback';

const MOCK_RESPONSES = [
  { id: '1', content: 'Correct', onClick: () => alert('Clicked correct') },
  { id: '2', content: 'Easy to understand', onClick: () => alert('Clicked easy to understand') },
  { id: '3', content: 'Complete', onClick: () => alert('Clicked complete') }
];

describe('UserFeedback', () => {
  it('should render correctly', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} />);
    expect(screen.getByRole('heading', { name: /Why did you choose this rating?/i })).toBeTruthy();
    screen.getByText(/optional/i);
    screen.getByRole('button', { name: /Correct/i });
    screen.getByRole('button', { name: /Easy to understand/i });
    screen.getByRole('button', { name: /Complete/i });
    screen.getByRole('button', { name: /Submit/i });
    expect(screen.queryByRole('button', { name: /Close/i })).toBeFalsy();
    expect(screen.queryByRole('textbox', { name: /Provide additional feedback/i })).toBeFalsy();
  });
  it('should render different title correctly', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} title="Thanks! Why?" />);
    expect(screen.getByText('Thanks! Why?')).toBeTruthy();
  });
  it('should render different submit button text correctly', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} submitWord="Give feedback" />);
    expect(screen.getByRole('button', { name: /Give feedback/i })).toBeTruthy();
  });
  it('should render text area correctly', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} hasTextArea />);
    expect(screen.getByRole('textbox', { name: /Provide additional feedback/i })).toBeTruthy();
  });
  it('should render different placeholder correctly', () => {
    render(
      <UserFeedback
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        hasTextArea
        textAreaPlaceholder="Provide any other information"
      />
    );
    expect(screen.getByRole('textbox', { name: /Provide additional feedback/i })).toHaveAttribute(
      'placeholder',
      'Provide any other information'
    );
  });
  it('should render different text area label correctly', () => {
    render(
      <UserFeedback
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        hasTextArea
        textAreaAriaLabel="Provide more details"
      />
    );
    expect(screen.getByRole('textbox', { name: /Provide more details/i })).toBeTruthy();
  });
  it('should handle onClose correctly', async () => {
    const spy = jest.fn();
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} onClose={spy} />);
    const closeButton = screen.getByRole('button', { name: 'Close' });
    expect(closeButton).toBeTruthy();
    await userEvent.click(closeButton);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should be able to change close button aria label', () => {
    const spy = jest.fn();
    render(
      <UserFeedback
        onSubmit={jest.fn}
        quickResponses={MOCK_RESPONSES}
        onClose={spy}
        closeButtonAriaLabel="Ima button"
      />
    );
    expect(screen.getByRole('button', { name: /Ima button/i })).toBeTruthy();
  });
  it('should handle className', async () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} className="test" data-testid="card" />);
    expect(screen.getByTestId('card')).toHaveClass('test');
  });
  it('should apply id', async () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} id="test" data-testid="card" />);
    expect(screen.getByTestId('card').parentElement).toHaveAttribute('id', 'test');
  });
  it('renders with no timeout by default', () => {
    jest.useFakeTimers();
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} />);
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(screen.getByText('Why did you choose this rating?')).toBeVisible();
    jest.useRealTimers();
  });
  it('should handle timeout correctly after 8000ms when timeout = true', async () => {
    jest.useFakeTimers();
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout />);
    act(() => {
      jest.advanceTimersByTime(7999);
    });
    expect(screen.getByText('Why did you choose this rating?')).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByText('Why did you choose this rating?')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
  it('should handle timeout correctly when timeout = numeric value', async () => {
    jest.useFakeTimers();
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout={300} />);
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(screen.getByText('Why did you choose this rating?')).toBeVisible();
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByText('Why did you choose this rating?')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
  it('does not get removed on timeout if the user is focused on the card', async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay)
    });
    jest.useFakeTimers();
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" />);
    expect(screen.getByText('Why did you choose this rating?')).toBeTruthy();
    await user.click(screen.getByTestId('card'));
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(screen.getByText('Why did you choose this rating?')).toBeTruthy();
    jest.useRealTimers();
  });
  it('does not remove the card on timeout if the user is hovered over it', async () => {
    const user = userEvent.setup({
      advanceTimers: (delay) => jest.advanceTimersByTime(delay)
    });
    jest.useFakeTimers();
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" />);
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
        <UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" />
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
    expect(screen.queryByText('Why did you choose this rating?')).not.toBeInTheDocument();
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
        <UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" />
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
    expect(screen.queryByText('Why did you choose this rating?')).not.toBeInTheDocument();
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
        <UserFeedback
          onSubmit={jest.fn}
          quickResponses={MOCK_RESPONSES}
          timeout
          data-testid="card"
          timeoutAnimation={1000}
        />
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
    expect(screen.queryByText('Why did you choose this rating?')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
  it('does not call the onTimeout callback before the timeout period has expired', () => {
    const spy = jest.fn();
    jest.useFakeTimers();
    render(
      <UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" onTimeout={spy} />
    );
    act(() => {
      jest.advanceTimersByTime(7999);
    });
    expect(spy).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
  it('calls the onTimeout callback after the timeout period has expired', () => {
    jest.useFakeTimers();
    const spy = jest.fn();
    render(
      <UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" onTimeout={spy} />
    );
    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(spy).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('renders without aria-live and aria-atomic attributes by default', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" />);
    const card = screen.getByTestId('card').parentElement;
    expect(card).not.toHaveAttribute('aria-live');
    expect(card).not.toHaveAttribute('aria-atomic');
  });

  it('has an aria-live value of polite and aria-atomic value of false when isLiveRegion = true', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} timeout data-testid="card" isLiveRegion />);
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
        <UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} data-testid="card" onMouseEnter={spy} />
      </div>
    );
    const card = screen.getByTestId('card');
    expect(spy).toHaveBeenCalledTimes(0);
    await user.hover(card);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('calls onMouseExit appropriately', async () => {
    const spy = jest.fn();
    const user = userEvent.setup();
    render(
      <div>
        <input />
        <UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} data-testid="card" onMouseLeave={spy} />
      </div>
    );
    const card = screen.getByTestId('card');
    expect(spy).toHaveBeenCalledTimes(0);
    await user.hover(card);
    await user.hover(screen.getByRole('textbox'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('should handle submit correctly when nothing is selected', async () => {
    const spy = jest.fn();
    render(<UserFeedback onSubmit={spy} quickResponses={MOCK_RESPONSES} />);
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(undefined, '');
  });
  it('should handle submit correctly when item is selected', async () => {
    const spy = jest.fn();
    render(<UserFeedback onSubmit={spy} quickResponses={MOCK_RESPONSES} />);
    await userEvent.click(screen.getByRole('button', { name: /Complete/i }));
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('3', '');
  });
  it('should handle submit correctly when there is just text input', async () => {
    const spy = jest.fn();
    render(<UserFeedback onSubmit={spy} quickResponses={MOCK_RESPONSES} hasTextArea />);
    await userEvent.type(
      screen.getByRole('textbox', { name: /Provide additional feedback/i }),
      'What a great experience!'
    );
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(undefined, 'What a great experience!');
  });
  it('should handle submit correctly when item is selected and there is text input', async () => {
    const spy = jest.fn();
    render(<UserFeedback onSubmit={spy} quickResponses={MOCK_RESPONSES} hasTextArea />);
    await userEvent.click(screen.getByRole('button', { name: /Complete/i }));
    await userEvent.type(
      screen.getByRole('textbox', { name: /Provide additional feedback/i }),
      'What a great experience!'
    );
    await userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('3', 'What a great experience!');
  });
  it('should default title heading level to h1', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} />);
    expect(screen.getByRole('heading', { level: 1, name: /Why did you choose this rating?/i })).toBeTruthy();
  });
  it('should be able to change title heading level', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} headingLevel="h6" />);
    expect(screen.getByRole('heading', { level: 6, name: /Why did you choose this rating?/i })).toBeTruthy();
  });
  it('should focus on load by default', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} data-testid="card" />);
    expect(screen.getByTestId('card').parentElement).toHaveFocus();
  });
  it('should not focus on load if focusOnLoad = false', () => {
    render(<UserFeedback onSubmit={jest.fn} quickResponses={MOCK_RESPONSES} data-testid="card" focusOnLoad={false} />);
    expect(screen.getByTestId('card').parentElement).not.toHaveFocus();
  });
});
