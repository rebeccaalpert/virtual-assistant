import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import VirtualAssistant from './VirtualAssistant';

describe('VirtualAssistant', () => {

  it('should render assistant', () => {
    const { container } = render(<VirtualAssistant />);
    expect(container).toMatchSnapshot();
  });

  it('should render contents within the assistant', () => {
    render(<VirtualAssistant><span>hello world</span></VirtualAssistant>);
    expect(screen.getByText("hello world")).toBeTruthy();
  });

  it('should set custom title', () => {
    render(<VirtualAssistant
      title="I am a custom title"
    />);
    expect(screen.getByText('I am a custom title')).toBeTruthy();
  });

  it('should set custom input placeholder', () => {
    render(<VirtualAssistant
      inputPlaceholder="I am a custom placeholder"
    />);
    expect(screen.getByPlaceholderText('I am a custom placeholder')).toBeTruthy();
  });

  it('should set message', () => {
    render(<VirtualAssistant
      message="I am the message"
    />);
    expect(screen.getByText('I am the message')).toBeTruthy();
  });

  it('should use custom icon', () => {
    const MyIcon: React.FunctionComponent = () => <span>FakeIcon</span>;
    render(<VirtualAssistant
      icon={MyIcon}
    />);
    expect(screen.getByText('FakeIcon')).toBeTruthy();
  });

  it('should listen to message changes', async () => {
    const listener = jest.fn();
    render(<VirtualAssistant
      onChangeMessage={listener}
    />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: 'hello textbox'
      }
    });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.lastCall[1]).toBe('hello textbox');
  });

  it('should listen to send button press', async () => {
    const listener = jest.fn();
    render(<VirtualAssistant
      message={"I am the senate"}
      onSendMessage={listener}
    />);

    fireEvent.click(screen.getByRole("button"));

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.lastCall[0]).toBe('I am the senate');
  });

  it('should disable input', () => {
    render(<VirtualAssistant
      isInputDisabled={true}
    />);
    expect(screen.getByRole("textbox")).not.toBeEnabled();
  });

  it('should disable button', () => {
    render(<VirtualAssistant
      isSendButtonDisabled={true}
    />);
    expect(screen.getByRole("button")).not.toBeEnabled();
  });

  it('should trigger onSendMessage when pressing enter if there is a message', async () => {
    const user = userEvent.setup();
    const listener = jest.fn();
    render(<VirtualAssistant
      onSendMessage={listener}
      message="hello world"
    />);

    await user.type(screen.getByRole("textbox"), "[Enter]");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.lastCall[0]).toBe('hello world');
  });

  it('should not trigger onSendMessage when pressing shift+enter if there is a message', async () => {
    const user = userEvent.setup();
    const listener = jest.fn();
    render(<VirtualAssistant
      onSendMessage={listener}
      message="hello world"
    />);

    await user.type(screen.getByRole("textbox"), "{Shift>}[Enter]{/Shift}");
    expect(listener).not.toHaveBeenCalled();
  });

  it('should not trigger onSendMessage when pressing enter if there is no text', async () => {
    const user = userEvent.setup();
    const listener = jest.fn();
    render(<VirtualAssistant
      onSendMessage={listener}
      message=""
    />);

    await user.type(screen.getByRole("textbox"), "[Enter]");
    expect(listener).not.toHaveBeenCalled();
  });

  it('should not trigger onSendMessage when pressing enter if there is only spaces / new lines and other empty content', async () => {
    const user = userEvent.setup();
    const message = "  \n\n\n  \t\t   \n\n\t\t  ";
    const listener = jest.fn();
    render(<VirtualAssistant
      onSendMessage={listener}
      message={message}
    />);

    await user.type(screen.getByRole("textbox"), "[Enter]");
    expect(listener).not.toHaveBeenCalled();
  });

  it('should not trigger onSendMessage when pressing enter if the send button is disabled', async () => {
    const user = userEvent.setup();
    const listener = jest.fn();
    render(<VirtualAssistant
      onSendMessage={listener}
      isSendButtonDisabled
      message="hello world"
    />);

    await user.type(screen.getByRole("textbox"), "[Enter]");
    expect(listener).not.toHaveBeenCalled();
  });

});
