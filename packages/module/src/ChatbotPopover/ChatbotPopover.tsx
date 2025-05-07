// ============================================================================
// Chatbot Popover
// ============================================================================
import type { FunctionComponent } from 'react';

// Import PatternFly components
import { Popover, PopoverProps } from '@patternfly/react-core';

export const ChatbotPopover: FunctionComponent<PopoverProps> = ({ children, className, ...props }) => (
  <Popover className={`pf-chatbot__popover ${className ?? ''}`} showClose={false} {...props}>
    {children}
  </Popover>
);

export default ChatbotPopover;
