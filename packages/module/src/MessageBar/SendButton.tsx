// ============================================================================
// Chatbot Footer - Message Bar - Send
// ============================================================================
import React from 'react';

// Import PatternFly components
import { Button, ButtonProps, Tooltip, TooltipProps } from '@patternfly/react-core';

import { PaperPlaneIcon } from '@patternfly/react-icons/dist/esm/icons/paper-plane-icon';

export interface SendButtonProps extends ButtonProps {
  /** OnClick Handler for the Send Button */
  onClick: () => void;
  /** Class Name for the Send button */
  className?: string;
  /** Props to control the PF Tooltip component */
  tooltipProps?: TooltipProps;
}

export const SendButton: React.FunctionComponent<SendButtonProps> = ({
  className,
  onClick,
  tooltipProps,
  ...props
}: SendButtonProps) => {
  // Configure tooltip
  const tooltipSendMessageRef = React.useRef();

  return (
    <>
      <Button
        className={`pf-chatbot__button--send ${className ?? ''}`}
        variant="plain"
        aria-describedby="pf-chatbot__tooltip--send"
        aria-label={props['aria-label'] || 'Send Button'}
        ref={tooltipSendMessageRef}
        onClick={onClick}
        {...props}
      >
        <PaperPlaneIcon />
      </Button>
      <Tooltip
        id="pf-chatbot__tooltip--send"
        content="Send"
        triggerRef={tooltipSendMessageRef}
        position={tooltipProps?.position || 'top'}
        entryDelay={tooltipProps?.entryDelay || 0}
        exitDelay={tooltipProps?.exitDelay || 0}
        distance={tooltipProps?.distance || 8}
        animationDuration={tooltipProps?.animationDuration || 0}
        {...tooltipProps}
      />
    </>
  );
};

export default SendButton;
