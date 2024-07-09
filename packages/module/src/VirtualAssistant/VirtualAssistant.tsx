import React, { KeyboardEventHandler } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupText,
  TextArea
} from '@patternfly/react-core';
import { PaperPlaneIcon } from '@patternfly/react-icons';

export interface VirtualAssistantProps {
  /** Messages rendered within the assistant */
  children?: React.ReactNode;
  /** Header title for the assistant */
  title?: React.ReactNode;
  /** Input's placeholder for the assistant */
  inputPlaceholder?: string;
  /** Input's content */
  message?: string;
  /** Header actions of the assistant */
  actions?: React.ReactNode;
  /** Input's content change */
  onChangeMessage?: (event: React.ChangeEvent<HTMLTextAreaElement>, value: string) => void;
  /** Fire when clicking the Send (Plane) icon */
  onSendMessage?: (message: string) => void;
  /** Disables the text input */
  isInputDisabled?: boolean;
  /** Disables the send button */
  isSendButtonDisabled?: boolean;
}

export const VirtualAssistant: React.FunctionComponent<VirtualAssistantProps> = ({
  children,
  title = 'Virtual Assistant',
  inputPlaceholder = 'Type a message...',
  message = '',
  actions,
  onChangeMessage,
  onSendMessage,
  isInputDisabled = false,
  isSendButtonDisabled = false,
}: VirtualAssistantProps) => {

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (!event.shiftKey) {
        if (message.trim() === '' || isSendButtonDisabled) {
          event.preventDefault();
        } else {
          onSendMessage && onSendMessage(message);
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader actions={actions ? {
        actions
      } : undefined}>
        <CardTitle className="pf-v5-u-font-size-xl" data-test-id="assistant-title">
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody >
        {children}
      </CardBody>
      <CardFooter>
        <InputGroup>
          <TextArea
            placeholder={inputPlaceholder}
            value={message}
            onChange={onChangeMessage}
            onKeyPress={handleKeyPress}
            type="text"
            aria-label="Assistant input"
            isDisabled={isInputDisabled}
            data-test-id="assistant-text-input"
          />
          <InputGroupText>
            <Button isDisabled={isSendButtonDisabled} data-test-id="assistant-send-button" aria-label="Virtual assistant's message" variant="plain" className="pf-v5-u-px-sm" onClick={onSendMessage ? () => {
              onSendMessage(message);
            } : undefined}>
              <PaperPlaneIcon />
            </Button>
          </InputGroupText>
        </InputGroup>
      </CardFooter>
    </Card>
  );
};

export default VirtualAssistant;
