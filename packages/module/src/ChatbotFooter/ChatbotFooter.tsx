// ============================================================================
// Chatbot Footer
// ============================================================================

// Global footer component
// Supports:
// - Message bar
// - Footnote
// - Footnote popover

import type { HTMLProps, ReactNode, FunctionComponent } from 'react';

import { Divider } from '@patternfly/react-core';

export interface ChatbotFooterProps extends HTMLProps<HTMLDivElement> {
  /** Children for the Footer that supports MessageBar and FootNote components*/
  children?: ReactNode;
  /** Custom classname for the Footer component */
  className?: string;
  isCompact?: boolean;
}

export const ChatbotFooter: FunctionComponent<ChatbotFooterProps> = ({
  children,
  className,
  isCompact,
  ...props
}: ChatbotFooterProps) => (
  <div className={`pf-chatbot__footer ${isCompact ? 'pf-m-compact' : ''} ${className ?? ''}`} {...props}>
    <Divider />
    <div className="pf-chatbot__footer-container">{children}</div>
  </div>
);

export default ChatbotFooter;
