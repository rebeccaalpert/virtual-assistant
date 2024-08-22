// ============================================================================
// Chatbot Attachment Menu
// ============================================================================
import React from 'react';

// Import PatternFly components
import {
  MenuSearch,
  MenuSearchInput,
  SearchInput,
  MenuPopperProps,
  DropdownProps,
  Divider,
  DropdownList,
  DropdownItem
} from '@patternfly/react-core';
import { Dropdown, DropdownToggleProps } from './Dropdown';
import { UploadIcon } from '@patternfly/react-icons';

export interface AttachMenuProps extends DropdownProps {
  /** Items in menu */
  filteredItems: React.ReactNode;
  /** A callback for when the input value changes. */
  handleTextInputChange: (value: string) => void;
  /** Flag to indicate if menu is opened. */
  isOpen: boolean;
  /** Reference to the menu  */
  menuRef?: React.RefObject<any>;
  /** Additional properties to pass to the Popper */
  popperProps?: MenuPopperProps;
  /** Callback to change the open state of the menu. Triggered by clicking outside of the menu. */
  onOpenChange: (isOpen: boolean) => void;
  /** Keys that trigger onOpenChange, defaults to tab and escape. It is highly recommended to include Escape in the array, while Tab may be omitted if the menu contains non-menu items that are focusable. */
  onOpenChangeKeys: string[];
  /** Function callback called when user selects item. */
  onSelect: (event?: React.MouseEvent<Element, MouseEvent>, value?: string | number) => void;
  /** Placeholder for search input */
  searchInputPlaceholder?: string;
  /** Toggle to be rendered */
  toggle: DropdownToggleProps | ((toggleRef: React.RefObject<any>) => React.ReactNode);
}

export const AttachMenu: React.FunctionComponent<AttachMenuProps> = ({
  filteredItems,
  handleTextInputChange,
  isOpen,
  menuRef,
  popperProps = undefined,
  onOpenChange,
  onOpenChangeKeys,
  onSelect,
  searchInputPlaceholder,
  toggle,
  ...props
}: AttachMenuProps) => (
  <Dropdown
    distance={8}
    isOpen={isOpen}
    onOpenChange={(isOpen) => onOpenChange(isOpen)}
    onOpenChangeKeys={onOpenChangeKeys}
    toggle={toggle}
    popperProps={popperProps}
    ref={menuRef}
    onSelect={onSelect}
    {...props}
  >
    <MenuSearch>
      <MenuSearchInput>
        <SearchInput
          aria-label="Filter menu items"
          onChange={(_event, value) => handleTextInputChange(value)}
          placeholder={searchInputPlaceholder}
        />
      </MenuSearchInput>
    </MenuSearch>
    {filteredItems}
    <Divider />
    <DropdownList>
      <DropdownItem key="upload" value="upload" itemId="upload" icon={<UploadIcon />}>
        Upload from computer
      </DropdownItem>
    </DropdownList>
  </Dropdown>
);

export default AttachMenu;
