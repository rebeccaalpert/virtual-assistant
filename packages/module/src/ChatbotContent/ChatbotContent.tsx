// ============================================================================
// Chatbot Main
// ============================================================================
import type { HTMLProps, FunctionComponent } from 'react';

export interface ChatbotContentProps extends HTMLProps<HTMLDivElement> {
  /** Content to be displayed in the chatbot */
  children: React.ReactNode;
  /** Custom classname for the ChatbotContent component */
  className?: string;
}

export const ChatbotContent: FunctionComponent<ChatbotContentProps> = ({
  children,
  className,
  ...props
}: ChatbotContentProps) => (
  <div className={`pf-chatbot__content ${className ?? ''}`} {...props}>
    {children}
  </div>
);

export default ChatbotContent;
