import type { HTMLProps, FunctionComponent } from 'react';

import { Divider } from '@patternfly/react-core';

export interface ChatbotHeaderProps extends HTMLProps<HTMLDivElement> {
  /** Content to be displayed in the chatbot header */
  children: React.ReactNode;
  /** Custom classname for the header component */
  className?: string;
}

export const ChatbotHeader: FunctionComponent<ChatbotHeaderProps> = ({ className, children }: ChatbotHeaderProps) => (
  <div className="pf-chatbot__header-container">
    <div className={`pf-chatbot__header${className ? ` ${className}` : ''}`}>{children}</div>
    <Divider className="pf-chatbot__header__divider" />
  </div>
);

export default ChatbotHeader;
