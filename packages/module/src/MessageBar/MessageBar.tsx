// ============================================================================
// Chatbot Footer - Message Bar
// ============================================================================
import React from 'react';
import { TextAreaProps, Flex, FlexItem } from '@patternfly/react-core';
import { AutoTextArea } from 'react-textarea-auto-witdth-height';

// Import Chatbot components
import AttachButton from './AttachButton';
import MicrophoneButton from './MicrophoneButton';
import SendButton from './SendButton';
import AttachMenu from '../AttachMenu';

export interface MessageBarProps extends TextAreaProps {
  /** Callback to get the value of input message by user */
  onSendMessage: (message: string) => void;
  /** Class Name for the MessageBar component */
  className?: string;
  /** Flag to always to show the send button. By default send button is shown when there is a message in the input field */
  alwayShowSendButton?: boolean;
  /** Flag to disable/enable the Attach button  */
  hasAttachButton?: boolean;
  /** Flag to enable a menu that opens when the Attach button is clicked, instead of the attachment window */
  hasAttachMenu?: boolean;
  /** Flag to enable whether attach menu is open */
  isAttachMenuOpen?: boolean;
  /** Callback to close attach menu */
  setIsAttachMenuOpen?: (isOpen: boolean) => void;
  /** Items in menu */
  attachMenuItems?: React.ReactNode;
  /** A callback for when the attachment menu toggle is clicked */
  onAttachMenuToggleClick?: () => void;
  /** A callback for when the input value in the menu changes. */
  handleAttachMenuInputChange?: (value: string) => void;
  /** Function callback called when user selects item in menu. */
  onAttachMenuSelect?: (event?: React.MouseEvent<Element, MouseEvent>, value?: string | number) => void;
  /** Placeholder for search input */
  attachMenuInputPlaceholder?: string;
  /** Keys that trigger onOpenChange, defaults to tab and escape. It is highly recommended to include Escape in the array, while Tab may be omitted if the menu contains non-menu items that are focusable. */
  handleAttachMenuOnOpenChangeKeys?: string[];
  /** Callback to change the open state of the menu. Triggered by clicking outside of the menu. */
  onAttachMenuOpenChange?: (isOpen: boolean) => void;
  /** Flag to enable the Microphone button  */
  hasMicrophoneButton?: boolean;
  /** Callback function for when attach button is clicked */
  handleAttach?: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
}

export const MessageBar: React.FunctionComponent<MessageBarProps> = ({
  onSendMessage,
  className,
  alwayShowSendButton,
  hasAttachButton = true,
  hasAttachMenu,
  attachMenuItems,
  isAttachMenuOpen,
  setIsAttachMenuOpen,
  handleAttachMenuInputChange,
  onAttachMenuSelect,
  onAttachMenuToggleClick,
  attachMenuInputPlaceholder,
  handleAttachMenuOnOpenChangeKeys = ['Escape'],
  onAttachMenuOpenChange,
  hasMicrophoneButton,
  handleAttach,
  ...props
}: MessageBarProps) => {
  // Text Input
  // --------------------------------------------------------------------------
  const [message, setMessage] = React.useState<string>('');
  const [isListeningMessage, setIsListeningMessage] = React.useState<boolean>(false);

  const textareaRef = React.useRef(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const attachButtonRef = React.useRef<HTMLButtonElement>(null);

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

  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleAttachMenuToggle = () => {
    setIsAttachMenuOpen && setIsAttachMenuOpen(!isAttachMenuOpen);
    onAttachMenuToggleClick && onAttachMenuToggleClick();
  };

  return hasAttachMenu ? (
    <AttachMenu
      toggle={(toggleRef) => (
        <Flex
          className={`pf-chatbot__message-bar ${className ?? ''}`}
          alignItems={{ default: 'alignItemsCenter' }}
          justifyContent={{ default: 'justifyContentFlexEnd' }}
          flexWrap={{ default: 'wrap' }}
        >
          <FlexItem flex={{ default: 'flex_1' }} className="pf-chatbot__message-bar-input">
            <AutoTextArea
              ref={textareaRef}
              className="pf-chatbot__message-textarea"
              value={message as any} // Added any to make the third part TextArea component types happy. Remove when replced with PF TextArea
              onChange={handleChange as any} // Added any to make the third part TextArea component types happy. Remove when replced with PF TextArea
              onKeyDown={handleKeyDown}
              placeholder={isListeningMessage ? 'Listening' : 'Send a message...'}
              aria-label={isListeningMessage ? 'Listening' : 'Send a message...'}
              {...props}
            />
          </FlexItem>

          <FlexItem className="pf-chatbot__message-bar-actions">
            {(hasAttachButton || hasAttachMenu) && (
              <AttachButton
                ref={attachButtonRef}
                onClick={hasAttachMenu ? handleAttachMenuToggle : handleAttach}
                isDisabled={isListeningMessage}
              />
            )}
            {hasMicrophoneButton && (
              <MicrophoneButton
                isListening={isListeningMessage}
                onIsListeningChange={setIsListeningMessage}
                onSpeechRecognition={setMessage}
              />
            )}
            {(alwayShowSendButton || message) && <SendButton value={message} onClick={handleSend} />}
          </FlexItem>
        </Flex>
      )}
      menuRef={menuRef}
      filteredItems={attachMenuItems}
      isOpen={isAttachMenuOpen}
      onOpenChange={(isAttachMenuOpen) => {
        attachButtonRef.current?.focus();
        setIsAttachMenuOpen && setIsAttachMenuOpen(isAttachMenuOpen);
        onAttachMenuOpenChange && onAttachMenuOpenChange(isAttachMenuOpen);
      }}
      onOpenChangeKeys={handleAttachMenuOnOpenChangeKeys}
      onSelect={onAttachMenuSelect}
      handleTextInputChange={handleAttachMenuInputChange}
      popperProps={{ direction: 'up', distance: '8' }}
      searchInputPlaceholder={attachMenuInputPlaceholder}
    />
  ) : (
    <Flex
      className={`pf-chatbot__message-bar ${className ?? ''}`}
      alignItems={{ default: 'alignItemsCenter' }}
      justifyContent={{ default: 'justifyContentFlexEnd' }}
      flexWrap={{ default: 'wrap' }}
    >
      <FlexItem flex={{ default: 'flex_1' }} className="pf-chatbot__message-bar-input">
        <AutoTextArea
          ref={textareaRef}
          className="pf-chatbot__message-textarea"
          value={message as any} // Added any to make the third part TextArea component types happy. Remove when replced with PF TextArea
          onChange={handleChange as any} // Added any to make the third part TextArea component types happy. Remove when replced with PF TextArea
          onKeyDown={handleKeyDown}
          placeholder={isListeningMessage ? 'Listening' : 'Send a message...'}
          aria-label={isListeningMessage ? 'Listening' : 'Send a message...'}
          {...props}
        />
      </FlexItem>

      <FlexItem className="pf-chatbot__message-bar-actions">
        {(hasAttachButton || hasAttachMenu) && (
          <AttachButton
            ref={attachButtonRef}
            onClick={hasAttachMenu ? handleAttachMenuToggle : handleAttach}
            isDisabled={isListeningMessage}
          />
        )}
        {hasMicrophoneButton && (
          <MicrophoneButton
            isListening={isListeningMessage}
            onIsListeningChange={setIsListeningMessage}
            onSpeechRecognition={setMessage}
          />
        )}
        {(alwayShowSendButton || message) && <SendButton value={message} onClick={handleSend} />}
      </FlexItem>
    </Flex>
  );
};

export default MessageBar;
