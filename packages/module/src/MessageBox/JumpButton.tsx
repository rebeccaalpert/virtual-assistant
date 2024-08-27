// ============================================================================
// Chatbot Main - Messages - Jump to Top
// ============================================================================
import React from 'react';

// Import PatternFly components
import { Button, Tooltip } from '@patternfly/react-core';

import { ArrowUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-up-icon';
import { ArrowDownIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-down-icon';

export interface JumpButtonProps {
  /** Position of the Jump Button(top/bottom) */
  position: 'top' | 'bottom';
  /** Callback for the onClick event */
  onClick: () => void;
  /** Flag to change the visibilty of the button */
  isHidden?: boolean;
}

const JumpButton: React.FunctionComponent<JumpButtonProps> = ({ position, isHidden, onClick }: JumpButtonProps) => {
  // Configure tooltips
  const tooltipJumpTop = React.useRef();

  return (
    <>
      <Button
        className={`pf-chatbot__jump pf-chatbot__jump--${position} ${isHidden && `pf-chatbot__jump--${position}--hidden`}`}
        aria-label={`Jump ${position} button`}
        aria-describedby={`pf-chatbot__tooltip--jump-${position}`}
        ref={tooltipJumpTop}
        onClick={onClick}
      >
        {position === 'top' ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Button>
      <Tooltip
        id={`pf-chatbot__tooltip--jump-${position}`}
        content={`Back to ${position}`}
        position="top"
        triggerRef={tooltipJumpTop}
      />
    </>
  );
};

export default JumpButton;
