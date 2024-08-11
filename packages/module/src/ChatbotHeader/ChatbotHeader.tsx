import React from 'react';

// Import PatternFly components
import {
  Button,
  Tooltip,
  TooltipProps,
  Icon,
  Dropdown,
  DropdownGroup,
  DropdownList,
  DropdownItem,
  Split,
  SplitItem,
  Bullseye
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import OutlinedWindowRestoreIcon from '@patternfly/react-icons/dist/esm/icons/outlined-window-restore-icon';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';
import OpenDrawerRightIcon from '@patternfly/react-icons/dist/esm/icons/open-drawer-right-icon';
import EllipsisH from '@patternfly/react-icons/dist/esm/icons/ellipsis-h-icon';

// ============================================================================
// Chatbot Header
// ============================================================================

export interface ChatbotHeaderProps extends React.HTMLProps<HTMLDivElement> {
  /** Content to be displayed in the chatbot header */
  children?: React.ReactNode;
  /** Custom classname for the header component */
  className?: string;
  /** Callback function to attach to menu toggle on top right of chatbot header. toggle hidden if no callback provided */
  onMenuToggle?: () => void;
  /** Props spread to the PF Tooltip component wrapping the display mode dropdown */
  tooltipProps?: TooltipProps;
  /** Callback fired when a display mode is selection from the dropdown */
  onDisplayModeSelect?: () => void;
}

export const ChatbotHeader: React.FunctionComponent<ChatbotHeaderProps> = ({
  className,
  children,
  onMenuToggle,
  tooltipProps,
  onDisplayModeSelect,
  ...props
}: ChatbotHeaderProps) => {
  const [isDisplayOptionsMenuOpen, setIsDisplayOptionsMenuOpen] = React.useState(false);

  return (
    <div className={`pf-chatbot__header ${className}`} {...props}>
      <Split>
        {onMenuToggle !== undefined && (
          <SplitItem>
            <Tooltip content="Menu" position="bottom" {...tooltipProps}>
              <Button
                className="pf-chatbot__button--toggle-menu"
                variant="plain"
                aria-describedby="pf-chatbot__tooltip--toggle-menu"
                onClick={onMenuToggle}
                aria-label="Toggle menu"
              >
                <Icon size="lg">
                  <BarsIcon />
                </Icon>
              </Button>
            </Tooltip>
          </SplitItem>
        )}
        <SplitItem isFilled>
          <Bullseye>{children}</Bullseye>
        </SplitItem>
        <SplitItem>
          <Dropdown
            className="pf-chatbot__options"
            isOpen={isDisplayOptionsMenuOpen}
            onSelect={() => {
              onDisplayModeSelect && onDisplayModeSelect();
              setIsDisplayOptionsMenuOpen(false);
            }}
            onOpenChange={(isOpen) => setIsDisplayOptionsMenuOpen(isOpen)}
            popperProps={{ position: 'right' }}
            shouldFocusToggleOnSelect
            shouldFocusFirstItemOnOpen={false}
            toggle={(buttonToggleOptionsRef) => (
              <Tooltip className="pf-chatbot__tooltip" content="Display mode options" position="bottom">
                <Button
                  className="pf-chatbot__button--toggle-options"
                  variant="plain"
                  aria-label="Toggle display mode options"
                  ref={buttonToggleOptionsRef}
                  onClick={() => setIsDisplayOptionsMenuOpen(!isDisplayOptionsMenuOpen)}
                >
                  <Icon size="lg">
                    <EllipsisH />
                  </Icon>
                </Button>
              </Tooltip>
            )}
          >
            <DropdownGroup label="Display mode">
              <DropdownList>
                <DropdownItem value="Overlay" key="switchDisplayOverlay">
                  <OutlinedWindowRestoreIcon />
                  <span>Overlay</span>
                </DropdownItem>
                <DropdownItem value="Dock to window" key="switchDisplayDock">
                  <OpenDrawerRightIcon />
                  <span>Dock to window</span>
                </DropdownItem>
                <DropdownItem value="Fullscreen" key="switchDisplayFullscreen">
                  <ExpandIcon />
                  <span>Fullscreen</span>
                </DropdownItem>
              </DropdownList>
            </DropdownGroup>
          </Dropdown>
        </SplitItem>
      </Split>
    </div>
  );
};

export default ChatbotHeader;
