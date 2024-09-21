import React from 'react';

export interface ChatbotHeaderTitleProps {
  /** Content to be displayed in the chatbot header */
  children: React.ReactNode;
  /** Custom classname for the header component */
  className?: string;
}

export const ChatbotHeaderTitle: React.FunctionComponent<ChatbotHeaderTitleProps> = ({
  className,
  children
}: ChatbotHeaderTitleProps) => <div className={`pf-chatbot__title ${className || ''}`}>{children}</div>;

export default ChatbotHeaderTitle;
