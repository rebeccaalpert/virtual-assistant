// ============================================================================
// Chatbot Footer - Message Bar
// ============================================================================
import React from 'react';
import { TextArea, TextAreaProps } from '@patternfly/react-core';

// Import Chatbot components
import AttachButton from './AttachButton';
import MicrophoneButton from './MicrophoneButton';
import SendButton from './SendButton';

export interface MessageBarProps extends TextAreaProps {
  /** Callback to get the value of input message by user */
  onSendMessage: (message: string) => void;
  /** Class Name for the MessageBar component */
  className?: string;
  /** Flag to always to show the send button. By default send button is shown when there is a message in the input field */
  alwayShowSendButton?: boolean;
  /** Flag to enable the Attach button  */
  hasAttachButton?: boolean;
  /** Flag to enable the Microphone button  */
  hasMicrophoneButton?: boolean;
}

export const MessageBar: React.FunctionComponent<MessageBarProps> = ({
  onSendMessage,
  className,
  alwayShowSendButton,
  hasAttachButton,
  hasMicrophoneButton,
  ...props
}: MessageBarProps) => {
  // Text Input
  // --------------------------------------------------------------------------
  const [message, setMessage] = React.useState<string>('');
  const [isListeningMessage, setIsListeningMessage] = React.useState<boolean>(false);

  const textareaRef = React.useRef(null);

  const handleChange = React.useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  // Handle sending message
  const handleSend = React.useCallback(() => {
    setMessage((m) => {
      onSendMessage(m);
      return '';
    });
  }, [onSendMessage]);

  // Attachments
  // --------------------------------------------------------------------------
  const handleAttach = React.useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Attach button clicked');
  }, []);

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className={`pf-chatbot__message-bar ${className}`}>
      <div className="pf-chatbot__message-bar-input">
        <TextArea
          ref={textareaRef}
          className="pf-chatbot__message-textarea"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isListeningMessage ? 'Listening' : 'Send a message...'}
          aria-label={isListeningMessage ? 'Listening' : 'Send a message...'}
          autoResize
          {...props}
        />
      </div>

      <div className="pf-chatbot__message-bar-actions">
        {hasAttachButton && <AttachButton onClick={handleAttach} isDisabled={isListeningMessage} />}
        {hasMicrophoneButton && (
          <MicrophoneButton
            isListening={isListeningMessage}
            onIsListeningChange={setIsListeningMessage}
            onSpeechRecognition={setMessage}
          />
        )}
        {(alwayShowSendButton || message) && <SendButton value={message} onClick={handleSend} />}
      </div>
    </div>
  );
};

export default MessageBar;
