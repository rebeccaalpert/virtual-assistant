import type { FunctionComponent, MouseEvent, Ref } from 'react';
import { forwardRef } from 'react';
import { Button, ButtonProps, Icon, Tooltip, TooltipProps } from '@patternfly/react-core';

export interface ResponseActionButtonProps extends ButtonProps {
  /** Aria-label for the button. Defaults to the value of the tooltipContent if none provided */
  ariaLabel?: string;
  /** Aria-label for the button, shown when the button is clicked. Defaults to the value of ariaLabel or tooltipContent if not provided. */
  clickedAriaLabel?: string;
  /** Icon for the button */
  icon: React.ReactNode;
  /** On-click handler for the button */
  onClick?: ((event: MouseEvent | React.MouseEvent<Element, MouseEvent> | KeyboardEvent) => void) | undefined;
  /** Class name for the button */
  className?: string;
  /** Props to control if the attach button should be disabled */
  isDisabled?: boolean;
  /** Content shown in the tooltip */
  tooltipContent?: string;
  /** Content shown in the tooltip when the button is clicked. Defaults to the value of tooltipContent if not provided. */
  clickedTooltipContent?: string;
  /** Props to control the PF Tooltip component */
  tooltipProps?: TooltipProps;
  /** Whether button is in clicked state */
  isClicked?: boolean;
  /** Ref applied to button  */
  innerRef?: React.Ref<HTMLButtonElement>;
}

export const ResponseActionButtonBase: FunctionComponent<ResponseActionButtonProps> = ({
  ariaLabel,
  clickedAriaLabel = ariaLabel,
  className,
  icon,
  isDisabled,
  onClick,
  tooltipContent,
  clickedTooltipContent = tooltipContent,
  tooltipProps,
  isClicked = false,
  innerRef,
  ...props
}) => {
  const generateAriaLabel = () => {
    if (ariaLabel) {
      return isClicked ? clickedAriaLabel : ariaLabel;
    }
    return isClicked ? clickedTooltipContent : tooltipContent;
  };

  return (
    <Tooltip
      id={`pf-chatbot__tooltip-response-action-${tooltipContent}`}
      content={isClicked ? clickedTooltipContent : tooltipContent}
      aria-live="polite"
      position="bottom"
      entryDelay={tooltipProps?.entryDelay || 0}
      exitDelay={tooltipProps?.exitDelay || 0}
      distance={tooltipProps?.distance || 8}
      animationDuration={tooltipProps?.animationDuration || 0}
      // prevents VO announcements of both aria label and tooltip
      aria="none"
      {...tooltipProps}
    >
      <Button
        variant="plain"
        className={`pf-chatbot__button--response-action ${isClicked ? 'pf-chatbot__button--response-action-clicked' : ''} ${className ?? ''}`}
        aria-label={generateAriaLabel()}
        icon={
          <Icon isInline size="lg">
            {icon}
          </Icon>
        }
        isDisabled={isDisabled}
        onClick={onClick}
        size="sm"
        ref={innerRef}
        {...props}
      ></Button>
    </Tooltip>
  );
};

const ResponseActionButton = forwardRef((props: ResponseActionButtonProps, ref: Ref<HTMLButtonElement>) => (
  <ResponseActionButtonBase innerRef={ref} {...props} />
));

export default ResponseActionButton;
