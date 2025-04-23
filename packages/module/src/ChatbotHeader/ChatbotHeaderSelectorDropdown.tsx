import type { ReactNode, FunctionComponent, Ref } from 'react';
import { useState } from 'react';

import { Tooltip, TooltipProps, Dropdown, DropdownProps, MenuToggle, MenuToggleElement } from '@patternfly/react-core';

export interface ChatbotHeaderSelectorDropdownProps extends Omit<DropdownProps, 'toggle'> {
  /** Value of the selected dropdown item */
  value: string;
  /** Content to be displayed in the chatbot header */
  children: ReactNode;
  /** Custom classname for the header component */
  className?: string;
  /** Props spread to the PF Tooltip component wrapping the display mode dropdown */
  tooltipProps?: TooltipProps;
  /** Aria label for menu toggle */
  menuToggleAriaLabel?: string;
  /** Text displayed in Tooltip wrapping the display mode dropdown */
  tooltipContent?: string;
  isCompact?: boolean;
}

export const ChatbotHeaderSelectorDropdown: FunctionComponent<ChatbotHeaderSelectorDropdownProps> = ({
  value,
  className,
  children,
  onSelect,
  tooltipProps,
  tooltipContent = 'Select model',
  menuToggleAriaLabel,
  isCompact,
  ...props
}: ChatbotHeaderSelectorDropdownProps) => {
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [defaultAriaLabel, setDefaultAriaLabel] = useState('Select model');

  const toggle = (toggleRef: Ref<MenuToggleElement>) => (
    <Tooltip
      className="pf-chatbot__tooltip"
      content={tooltipContent}
      position="bottom"
      // prevents VO announcements of both aria label and tooltip
      aria="none"
      {...tooltipProps}
    >
      <MenuToggle
        variant="secondary"
        aria-label={menuToggleAriaLabel ?? defaultAriaLabel}
        ref={toggleRef}
        isExpanded={isOptionsMenuOpen}
        onClick={() => setIsOptionsMenuOpen(!isOptionsMenuOpen)}
        size={isCompact ? 'sm' : undefined}
        className={`${isCompact ? 'pf-m-compact' : ''}`}
      >
        {value}
      </MenuToggle>
    </Tooltip>
  );

  return (
    <Dropdown
      className={`pf-chatbot__selections ${className ?? ''}`}
      isOpen={isOptionsMenuOpen}
      onSelect={(e, value) => {
        onSelect && onSelect(e, value);
        setDefaultAriaLabel(`Select model: ${value}`);
        setIsOptionsMenuOpen(false);
      }}
      onOpenChange={(isOpen) => setIsOptionsMenuOpen(isOpen)}
      popperProps={{ position: 'right', appendTo: 'inline' }}
      shouldFocusToggleOnSelect
      shouldFocusFirstItemOnOpen
      toggle={toggle}
      {...props}
    >
      {children}
    </Dropdown>
  );
};

export default ChatbotHeaderSelectorDropdown;
