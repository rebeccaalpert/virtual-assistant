// ============================================================================
// Chatbot Popover
// ============================================================================
import React from 'react';

// Import PatternFly components
import { Popover as PatternflyPopover, PopoverProps } from '@patternfly/react-core';

export const Popover: React.FunctionComponent<PopoverProps> = ({ children, className, ...props }) => (
  <PatternflyPopover className={`pf-chatbot__popover ${className ?? ''}`} {...props}>
    {children}
  </PatternflyPopover>
);

export default Popover;
