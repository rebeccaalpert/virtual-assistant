import React from 'react';

import { Button, Icon, Tooltip, TooltipProps } from '@patternfly/react-core';
import { CloseIcon } from '@patternfly/react-icons';

export interface ChatbotHeaderCloseButtonProps {
  /** Callback function for when button is clicked */
  onClick: () => void;
  /** Custom classname for the header component */
  className?: string;
  /** Props spread to the PF Tooltip component wrapping the display mode dropdown */
  tooltipProps?: TooltipProps;
  /** Aria label for menu */
  menuAriaLabel?: string;
  /** Ref applied to menu */
  innerRef?: React.Ref<HTMLButtonElement>;
  /** Content used in tooltip */
  tooltipContent?: string;
}

const ChatbotHeaderCloseButtonBase: React.FunctionComponent<ChatbotHeaderCloseButtonProps> = ({
  className,
  onClick,
  tooltipProps,
  menuAriaLabel = 'Close',
  innerRef,
  tooltipContent = 'Close'
}: ChatbotHeaderCloseButtonProps) => (
  <div className={`pf-chatbot__menu ${className}`}>
    <Tooltip content={tooltipContent} position="bottom" {...tooltipProps}>
      <Button
        className="pf-chatbot__button--toggle-menu"
        variant="plain"
        onClick={onClick}
        aria-label={menuAriaLabel}
        ref={innerRef}
        icon={
          <Icon size="xl" isInline>
            <CloseIcon />
          </Icon>
        }
      />
    </Tooltip>
  </div>
);

export const ChatbotHeaderCloseButton = React.forwardRef(
  (props: ChatbotHeaderCloseButtonProps, ref: React.Ref<HTMLButtonElement>) => (
    <ChatbotHeaderCloseButtonBase innerRef={ref} {...props} />
  )
);
