import React from 'react';

import { Split } from '@patternfly/react-core';

export interface ChatbotHeaderProps extends React.HTMLProps<HTMLDivElement> {
  /** Content to be displayed in the chatbot header */
  children: React.ReactNode;
  /** Custom classname for the header component */
  className?: string;
}

export const ChatbotHeader: React.FunctionComponent<ChatbotHeaderProps> = ({
  className,
  children,
  ...props
}: ChatbotHeaderProps) => (
  <div className={`pf-chatbot__header ${className ?? ''}`} {...props}>
    <Split>{children}</Split>
  </div>
);

export default ChatbotHeader;
