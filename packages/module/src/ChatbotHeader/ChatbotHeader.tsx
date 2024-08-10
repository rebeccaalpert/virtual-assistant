
import React from 'react'

// Import PatternFly components
import { Button, Tooltip, TooltipProps, Icon, Brand, BrandProps, Dropdown, DropdownGroup, DropdownList, DropdownItem } from '@patternfly/react-core'
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import OutlinedWindowRestoreIcon from '@patternfly/react-icons/dist/esm/icons/outlined-window-restore-icon';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';
import OpenDrawerRightIcon from '@patternfly/react-icons/dist/esm/icons/open-drawer-right-icon';
import EllipsisH from '@patternfly/react-icons/dist/esm/icons/ellipsis-h-icon';

// ============================================================================
// Chatbot Header
// ============================================================================


export interface ChatbotHeaderProps extends React.HTMLProps<HTMLDivElement> {
  /** Custom classname for the header component */
  className?: string;
  /** Callback function to attach to menu toggle on top right of chatbot header. toggle hidden if no callback provided */
  onMenuToggle?: () => void;
  /** Brand image / logo to display in the chatbot header */
  brandProps?: BrandProps;
  /** */
  tooltipProps?: TooltipProps;
  /** */
  onDisplayModeSelect?: () => void;
}

export const ChatbotHeader: React.FunctionComponent<ChatbotHeaderProps> = ({
  className,
  onMenuToggle,
  brandProps,
  tooltipProps,
  onDisplayModeSelect,
  ...props
}:ChatbotHeaderProps) => {
  const [ isDisplayOptionsMenuOpen, setIsDisplayOptionsMenuOpen ] = React.useState(false);

  return (
    <div className={`pf-chatbot__header ${className}`} {...props}>
      {onMenuToggle !== undefined && (
        <Tooltip
          content="Menu" // todo no hardcode
          position="bottom"
          {...tooltipProps}
        >
          <Button
            className="pf-chatbot__button pf-chatbot__button--toggle-menu"
            variant="plain"
            aria-describedby="pf-chatbot__tooltip--toggle-menu"
            onClick={onMenuToggle}
          >
            <Icon size="lg">
              <BarsIcon />
            </Icon>
          </Button>
        </Tooltip>
      )}
      {brandProps !== undefined && <Brand {...brandProps} />}
      <Dropdown
        className="pf-chatbot__options"
        isOpen={isDisplayOptionsMenuOpen}
        onSelect={onDisplayModeSelect}
        onOpenChange={isDisplayOptionsMenuOpen => setIsDisplayOptionsMenuOpen(isDisplayOptionsMenuOpen)}
        popperProps={{ position: 'right' }}
        shouldFocusToggleOnSelect
        toggle={buttonToggleOptionsRef => (
          <Tooltip className="pf-chatbot__tooltip" content="Options" position="bottom">
            <Button
              className="pf-chatbot__button pf-chatbot__button--toggle-options"
              variant="plain"
              aria-describedby="pf-chatbot__tooltip--toggle-options"
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
            <DropdownItem key="switchDisplayOverlay" >
              <OutlinedWindowRestoreIcon/>
              <span>Overlay</span>
            </DropdownItem>
            <DropdownItem key="switchDisplayDock">
              <OpenDrawerRightIcon />
              <span>Dock to window</span>
            </DropdownItem>
            <DropdownItem key="switchDisplayFullscreen" >
              <ExpandIcon />
              <span>Fullscreen</span>
            </DropdownItem>
          </DropdownList>
        </DropdownGroup>
      </Dropdown>
    </div>
  );
}

export default ChatbotHeader;
