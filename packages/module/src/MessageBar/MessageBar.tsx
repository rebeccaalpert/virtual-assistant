import React from 'react';
import { ButtonProps, DropEvent, TextArea } from '@patternfly/react-core';

// Import Chatbot components
import SendButton from './SendButton';
import MicrophoneButton from './MicrophoneButton';
import { AttachButton } from './AttachButton';
import AttachMenu from '../AttachMenu';
import StopButton from './StopButton';
import { ChatbotDisplayMode } from '../Chatbot';

export interface MessageBarWithAttachMenuProps {
  /** Flag to enable whether attach menu is open */
  isAttachMenuOpen: boolean;
  /** Callback to close attach menu */
  setIsAttachMenuOpen: (isOpen: boolean) => void;
  /** Items in menu */
  attachMenuItems: React.ReactNode;
  /** A callback for when the attachment menu toggle is clicked */
  onAttachMenuToggleClick: () => void;
  /** A callback for when the input value in the menu changes. */
  onAttachMenuInputChange: (value: string) => void;
  /** Function callback called when user selects item in menu. */
  onAttachMenuSelect?: (event?: React.MouseEvent<Element, MouseEvent>, value?: string | number) => void;
  /** Placeholder for search input */
  attachMenuInputPlaceholder?: string;
  /** Keys that trigger onOpenChange, defaults to tab and escape. It is highly recommended to include Escape in the array, while Tab may be omitted if the menu contains non-menu items that are focusable. */
  onAttachMenuOnOpenChangeKeys?: string[];
  /** Callback to change the open state of the menu. Triggered by clicking outside of the menu. */
  onAttachMenuOpenChange?: (isOpen: boolean) => void;
}

export interface MessageBarProps {
  /** Callback to get the value of input message by user */
  onSendMessage: (message: string) => void;
  /** Class Name for the MessageBar component */
  className?: string;
  /** Flag to always to show the send button. By default send button is shown when there is a message in the input field */
  alwayShowSendButton?: boolean;
  /** Flag to disable/enable the Attach button  */
  hasAttachButton?: boolean;
  /** Flag to enable the Microphone button  */
  hasMicrophoneButton?: boolean;
  /** Flag to enable the Stop button, used for streaming content */
  hasStopButton?: boolean;
  /** Callback function for when stop button is clicked */
  handleStopButton?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Callback function for when attach button is used to upload a file */
  handleAttach?: (data: File[], event: DropEvent) => void;
  /** Props to enable a menu that opens when the Attach button is clicked, instead of the attachment window */
  attachMenuProps?: MessageBarWithAttachMenuProps;
  /** Flag to provide manual control over whether send button is disabled */
  isSendButtonDisabled?: boolean;
  /** Prop to allow passage of additional props to buttons */
  buttonProps?: {
    attach?: { tooltipContent?: string; props?: ButtonProps; inputTestId?: string };
    stop?: { tooltipContent?: string; props?: ButtonProps };
    send?: { tooltipContent?: string; props?: ButtonProps };
    microphone?: {
      tooltipContent?: { active?: string; inactive?: string };
      language?: string;
      props?: ButtonProps;
    };
  };
  /** A callback for when the text area value changes. */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  /** Display mode of chatbot, if you want to message bar to resize when the display mode changes */
  displayMode?: ChatbotDisplayMode;
}

export const MessageBar: React.FunctionComponent<MessageBarProps> = ({
  onSendMessage,
  className,
  alwayShowSendButton,
  hasAttachButton = true,
  hasMicrophoneButton,
  handleAttach,
  attachMenuProps,
  isSendButtonDisabled,
  handleStopButton,
  hasStopButton,
  buttonProps,
  onChange,
  displayMode,
  ...props
}: MessageBarProps) => {
  // Text Input
  // --------------------------------------------------------------------------
  const [message, setMessage] = React.useState<string>('');
  const [isListeningMessage, setIsListeningMessage] = React.useState<boolean>(false);
  const [hasSentMessage, setHasSentMessage] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const attachButtonRef = React.useRef<HTMLButtonElement>(null);

  const setInitialLineHeight = (field: HTMLTextAreaElement) => {
    field.style.setProperty('line-height', '1rem');
    const parent = field.parentElement;
    if (parent) {
      parent.style.setProperty('margin-top', `1rem`);
      parent.style.setProperty('margin-bottom', `0rem`);
      parent.style.setProperty('height', 'inherit');

      const grandparent = parent.parentElement;
      if (grandparent) {
        grandparent.style.setProperty('flex-basis', 'auto');
      }
    }
  };

  const setAutoHeight = (field: HTMLTextAreaElement) => {
    const parent = field.parentElement;
    if (parent) {
      parent.style.setProperty('height', 'inherit');
      const computed = window.getComputedStyle(field);
      // Calculate the height
      const height =
        parseInt(computed.getPropertyValue('border-top-width')) +
        parseInt(computed.getPropertyValue('padding-top')) +
        field.scrollHeight +
        parseInt(computed.getPropertyValue('padding-bottom')) +
        parseInt(computed.getPropertyValue('border-bottom-width'));
      parent.style.setProperty('height', `${height}px`);

      if (height > 32 || window.innerWidth <= 507) {
        parent.style.setProperty('margin-bottom', `1rem`);
        parent.style.setProperty('margin-top', `1rem`);
      }
    }
  };

  const textIsLongerThan2Lines = (field: HTMLTextAreaElement) => {
    const lineHeight = parseFloat(window.getComputedStyle(field).lineHeight);
    const lines = field.scrollHeight / lineHeight;
    return lines > 2;
  };

  const setAutoWidth = (field: HTMLTextAreaElement) => {
    const parent = field.parentElement;
    if (parent) {
      const grandparent = parent.parentElement;
      if (textIsLongerThan2Lines(field) && grandparent) {
        grandparent.style.setProperty('flex-basis', `100%`);
      }
    }
  };

  const handleNewLine = (field: HTMLTextAreaElement) => {
    const parent = field.parentElement;
    if (parent) {
      parent.style.setProperty('margin-bottom', `1rem`);
      parent.style.setProperty('margin-top', `1rem`);
    }
  };

  React.useEffect(() => {
    const field = textareaRef.current;
    if (field) {
      if (field.value === '') {
        if (window.innerWidth > 507) {
          setInitialLineHeight(field);
        }
      } else {
        setAutoHeight(field);
        setAutoWidth(field);
      }
    }
    const resetHeight = () => {
      if (field) {
        if (field.value === '') {
          if (window.innerWidth > 507) {
            setInitialLineHeight(field);
          }
        } else {
          setAutoHeight(field);
          setAutoWidth(field);
        }
      }
    };
    window.addEventListener('resize', resetHeight);

    return () => {
      window.removeEventListener('resize', resetHeight);
    };
  }, []);

  React.useEffect(() => {
    const field = textareaRef.current;
    if (field) {
      if (field.value === '') {
        setInitialLineHeight(textareaRef.current);
      } else {
        setAutoHeight(textareaRef.current);
        setAutoWidth(field);
      }
    }
  }, [displayMode, message]);

  React.useEffect(() => {
    const field = textareaRef.current;
    if (field) {
      setInitialLineHeight(field);
      setHasSentMessage(false);
    }
  }, [hasSentMessage]);

  const handleChange = React.useCallback((event) => {
    onChange && onChange(event, event.target.value);
    if (textareaRef.current) {
      if (event.target.value === '') {
        setInitialLineHeight(textareaRef.current);
      } else {
        setAutoHeight(textareaRef.current);
      }
    }
    setMessage(event.target.value);
  }, []);

  // Handle sending message
  const handleSend = React.useCallback(() => {
    setMessage((m) => {
      onSendMessage(m);
      setHasSentMessage(true);
      return '';
    });
  }, [onSendMessage]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        if (!isSendButtonDisabled && !hasStopButton) {
          handleSend();
        }
      }
      if (event.key === 'Enter' && event.shiftKey) {
        if (textareaRef.current) {
          handleNewLine(textareaRef.current);
        }
      }
    },
    [handleSend, isSendButtonDisabled, handleStopButton]
  );

  const handleAttachMenuToggle = () => {
    attachMenuProps?.setIsAttachMenuOpen && attachMenuProps?.setIsAttachMenuOpen(!attachMenuProps?.isAttachMenuOpen);
    attachMenuProps?.onAttachMenuToggleClick();
  };

  const handleSpeechRecognition = (message) => {
    setMessage(message);
    onChange && onChange({} as React.ChangeEvent<HTMLTextAreaElement>, message);
  };

  const renderButtons = () => {
    if (hasStopButton && handleStopButton) {
      return (
        <StopButton
          onClick={handleStopButton}
          tooltipContent={buttonProps?.stop?.tooltipContent}
          {...buttonProps?.stop?.props}
        />
      );
    }
    return (
      <>
        {attachMenuProps && (
          <AttachButton
            ref={attachButtonRef}
            onClick={handleAttachMenuToggle}
            isDisabled={isListeningMessage}
            tooltipContent={buttonProps?.attach?.tooltipContent}
            {...buttonProps?.attach?.props}
          />
        )}
        {!attachMenuProps && hasAttachButton && (
          <AttachButton
            onAttachAccepted={handleAttach}
            isDisabled={isListeningMessage}
            tooltipContent={buttonProps?.attach?.tooltipContent}
            inputTestId={buttonProps?.attach?.inputTestId}
            {...buttonProps?.attach?.props}
          />
        )}
        {hasMicrophoneButton && (
          <MicrophoneButton
            isListening={isListeningMessage}
            onIsListeningChange={setIsListeningMessage}
            onSpeechRecognition={handleSpeechRecognition}
            tooltipContent={buttonProps?.microphone?.tooltipContent}
            language={buttonProps?.microphone?.language}
            {...buttonProps?.microphone?.props}
          />
        )}
        {(alwayShowSendButton || message) && (
          <SendButton
            value={message}
            onClick={handleSend}
            isDisabled={isSendButtonDisabled}
            tooltipContent={buttonProps?.send?.tooltipContent}
            {...buttonProps?.send?.props}
          />
        )}
      </>
    );
  };

  const messageBarContents = (
    <>
      <div className="pf-chatbot__message-bar-input">
        <TextArea
          className="pf-chatbot__message-textarea"
          value={message}
          onChange={handleChange}
          aria-label={isListeningMessage ? 'Listening' : 'Send a message...'}
          placeholder={isListeningMessage ? 'Listening' : 'Send a message...'}
          ref={textareaRef}
          onKeyDown={handleKeyDown}
          {...props}
        />
      </div>
      <div className="pf-chatbot__message-bar-actions">{renderButtons()}</div>
    </>
  );

  if (attachMenuProps) {
    return (
      <AttachMenu
        toggle={(toggleRef) => (
          <div ref={toggleRef} className={`pf-chatbot__message-bar ${className ?? ''}`}>
            {messageBarContents}
          </div>
        )}
        filteredItems={attachMenuProps?.attachMenuItems}
        {...(attachMenuProps && { isOpen: attachMenuProps.isAttachMenuOpen })}
        onOpenChange={(isAttachMenuOpen) => {
          attachButtonRef.current?.focus();
          attachMenuProps?.setIsAttachMenuOpen(isAttachMenuOpen);
          attachMenuProps?.onAttachMenuOpenChange && attachMenuProps?.onAttachMenuOpenChange(isAttachMenuOpen);
        }}
        onOpenChangeKeys={attachMenuProps?.onAttachMenuOnOpenChangeKeys}
        onSelect={attachMenuProps?.onAttachMenuSelect}
        {...(attachMenuProps && { handleTextInputChange: attachMenuProps.onAttachMenuInputChange })}
        popperProps={{ direction: 'up', distance: '8' }}
        searchInputPlaceholder={attachMenuProps?.attachMenuInputPlaceholder}
      />
    );
  }

  return <div className={`pf-chatbot__message-bar ${className ?? ''}`}>{messageBarContents}</div>;
};

export default MessageBar;
