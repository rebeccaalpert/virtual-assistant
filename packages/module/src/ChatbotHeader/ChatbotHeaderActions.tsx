import type { ReactNode, FunctionComponent } from 'react';

export interface ChatbotHeaderActionsProps {
  /** Content to be displayed in the chatbot header */
  children: ReactNode;
  /** Custom classname for the header component */
  className?: string;
}

export const ChatbotHeaderActions: FunctionComponent<ChatbotHeaderActionsProps> = ({
  className,
  children
}: ChatbotHeaderActionsProps) => <div className={`pf-chatbot__actions ${className || ''}`}>{children}</div>;

export default ChatbotHeaderActions;
