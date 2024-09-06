// ============================================================================
// Chatbot Footer - Message Bar
// ============================================================================
import React from 'react';
import { AutoTextArea } from 'react-textarea-auto-witdth-height';

// Import Chatbot components
import AttachButton from './AttachButton';
import MicrophoneButton from './MicrophoneButton';
import SendButton from './SendButton';
import AttachMenu from '../AttachMenu';
import { MessageBarBaseProps } from './MessageBarBase';

export interface MessageBarWithAttachMenuProps extends MessageBarBaseProps {
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

export const MessageBarWithAttachMenu: React.FunctionComponent<MessageBarWithAttachMenuProps> = ({
  onSendMessage,
  className,
  alwayShowSendButton,
  attachMenuItems,
  isAttachMenuOpen,
  setIsAttachMenuOpen,
  onAttachMenuInputChange,
  onAttachMenuSelect,
  onAttachMenuToggleClick,
  attachMenuInputPlaceholder,
  onAttachMenuOnOpenChangeKeys = ['Escape'],
  onAttachMenuOpenChange,
  hasMicrophoneButton,
  ...props
}: MessageBarWithAttachMenuProps) => {
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
    setIsAttachMenuOpen(!isAttachMenuOpen);
    onAttachMenuToggleClick();
  };

  const messageBarContent = (
    <>
      <div className="pf-chatbot__message-bar-input">
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
      </div>
      <div className="pf-chatbot__message-bar-actions">
        <AttachButton ref={attachButtonRef} onClick={handleAttachMenuToggle} isDisabled={isListeningMessage} />
        {hasMicrophoneButton && (
          <MicrophoneButton
            isListening={isListeningMessage}
            onIsListeningChange={setIsListeningMessage}
            onSpeechRecognition={setMessage}
          />
        )}
        {(alwayShowSendButton || message) && <SendButton value={message} onClick={handleSend} />}
      </div>
    </>
  );

  return (
    <AttachMenu
      toggle={(toggleRef) => (
        <div ref={toggleRef} className={`pf-chatbot__message-bar ${className ?? ''}`}>
          {messageBarContent}
        </div>
      )}
      menuRef={menuRef}
      filteredItems={attachMenuItems}
      isOpen={isAttachMenuOpen}
      onOpenChange={(isAttachMenuOpen) => {
        attachButtonRef.current?.focus();
        setIsAttachMenuOpen(isAttachMenuOpen);
        onAttachMenuOpenChange && onAttachMenuOpenChange(isAttachMenuOpen);
      }}
      onOpenChangeKeys={onAttachMenuOnOpenChangeKeys}
      onSelect={onAttachMenuSelect}
      handleTextInputChange={onAttachMenuInputChange}
      popperProps={{ direction: 'up', distance: '8' }}
      searchInputPlaceholder={attachMenuInputPlaceholder}
    />
  );
};

export default MessageBarWithAttachMenu;
