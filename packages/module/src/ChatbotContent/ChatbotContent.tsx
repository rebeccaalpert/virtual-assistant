// ============================================================================
// Chatbot Main
// ============================================================================
import React from 'react';

export interface ChatbotContentProps extends React.HTMLProps<HTMLDivElement> {
  /** Content to be displayed in the chatbot */
  children: React.ReactNode;
  /** Custom classname for the ChatbotContent component */
  className?: string;
}

export const ChatbotContent: React.FunctionComponent<ChatbotContentProps> = ({
  children,
  className,
  ...props
}: ChatbotContentProps) => (
  <div className={`pf-chatbot__content ${className ?? ''}`} {...props}>
    {children}
  </div>
);

export default ChatbotContent;
