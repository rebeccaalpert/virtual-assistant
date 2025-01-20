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
