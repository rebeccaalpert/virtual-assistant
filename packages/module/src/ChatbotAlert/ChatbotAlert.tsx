import type { FunctionComponent } from 'react';
import { Alert, AlertActionCloseButton, AlertProps } from '@patternfly/react-core';

export interface ChatbotAlert extends AlertProps {
  /** Callback for when close button is clicked; if none is provided, there will be no way to dismiss the alert */
  onClose?: () => void;
}

export const ChatbotAlert: FunctionComponent<ChatbotAlert> = ({
  variant = 'info',
  title,
  children = '',
  onClose,
  ...props
}: ChatbotAlert) => (
  <div className="pf-chatbot__alert">
    <Alert
      variant={variant}
      isInline
      title={title}
      component="h6"
      {...(onClose && {
        actionClose: <AlertActionCloseButton onClose={onClose} />
      })}
      {...props}
    >
      {children}
    </Alert>
  </div>
);

export default ChatbotAlert;
