import React from 'react';
import AttachMenu from '@patternfly/virtual-assistant/dist/dynamic/AttachMenu';
import { Button, Divider, DropdownGroup, DropdownItem, DropdownList } from '@patternfly/react-core';
import { BellIcon, CodeIcon, ClipboardIcon, CalendarAltIcon, UploadIcon } from '@patternfly/react-icons';
import PaperclipIcon from './PaperclipIcon';
import AttachmentIcon from './AttachmentIcon';

export const BasicDemo: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [refFullOptions, setRefFullOptions] = React.useState<Element[]>();
  const [filteredIds, setFilteredIds] = React.useState<string[]>(['*']);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const onToggleClick = () => {
    setTimeout(() => {
      if (menuRef.current) {
        const firstElement = menuRef.current.querySelector(
          'li > button:not(:disabled), li > a:not(:disabled), input:not(:disabled)'
        );
        firstElement && (firstElement as HTMLElement).focus();
        setRefFullOptions(Array.from(menuRef.current.querySelectorAll('li:not(li[role=separator])>*:first-child')));
      }
    }, 0);
    setIsOpen(!isOpen);
    setFilteredIds(['*']);
  };

  const menuItems = [
    <DropdownList key="group-1">
      <DropdownItem value="0" id="0" icon={<img src={AttachmentIcon} alt="Pod icon" />}>
        <div className="pf-chatbot__menu-operator">
          auth-operator
          <div className="pf-v6-c-menu__item-description">Pod</div>
        </div>
      </DropdownItem>
    </DropdownList>,
    <DropdownGroup key="group2">
      <DropdownList>
        <DropdownItem value="1" id="1" icon={<BellIcon />}>
          Alerts
        </DropdownItem>
        <DropdownItem value="2" id="2" icon={<CalendarAltIcon />}>
          Events
        </DropdownItem>
        <DropdownItem value="3" id="3" icon={<ClipboardIcon />}>
          Logs
        </DropdownItem>
        <DropdownItem value="4" id="4" icon={<CodeIcon />}>
          YAML - Status
        </DropdownItem>
        <DropdownItem value="5" id="5" icon={<CodeIcon />}>
          YAML - All contents
        </DropdownItem>
      </DropdownList>
    </DropdownGroup>
  ];

  const filterItems = (items: any[], filteredIds: string[]) => {
    if (filteredIds.length === 1 && filteredIds[0] === '*') {
      return items;
    }
    let keepDivider = false;
    const filteredCopy = items
      .map((group) => {
        if (group.type === DropdownGroup) {
          const filteredGroup = React.cloneElement(group, {
            children: React.cloneElement(group.props.children, {
              children: group.props.children.props.children.filter((child) => {
                if (filteredIds.includes(child.props.value)) {
                  return child;
                }
              })
            })
          });

          const filteredList = filteredGroup.props.children;
          if (filteredList.props.children.length > 0) {
            keepDivider = true;
            return filteredGroup;
          } else {
            keepDivider = false;
          }
        } else if (group.type === DropdownList) {
          let filteredGroup;
          if (Array.isArray(group.props.children)) {
            filteredGroup = React.cloneElement(group, {
              children: group.props.children.filter((child) => {
                if (filteredIds.includes(child.props.value)) {
                  return child;
                }
              })
            });
          } else {
            filteredGroup = React.cloneElement(group, {
              children: filteredIds.includes(group.props.children.props.value) ? [group.props.children] : []
            });
          }

          if (filteredGroup.props.children.length > 0) {
            keepDivider = true;
            return filteredGroup;
          } else {
            keepDivider = false;
          }
        } else {
          if ((keepDivider && group.type === Divider) || filteredIds.includes(group.props.value)) {
            return group;
          }
        }
      })
      .filter((newGroup) => newGroup);

    if (filteredCopy.length > 0) {
      const lastGroup = filteredCopy.pop();
      if (lastGroup.type !== Divider) {
        filteredCopy.push(lastGroup);
      }
    }

    return filteredCopy;
  };

  const onTextChange = (textValue: string) => {
    if (textValue === '') {
      setFilteredIds(['*']);
      return;
    }

    const filteredIds =
      refFullOptions
        ?.filter((item) => (item as HTMLElement).innerText.toLowerCase().includes(textValue.toString().toLowerCase()))
        .map((item) => item.id) || [];
    setFilteredIds(filteredIds);
  };

  const filteredItems = filterItems(menuItems, filteredIds);
  if (filteredItems.length === 0) {
    filteredItems.push(<DropdownItem key="no-items">No results found</DropdownItem>);
  }
  filteredItems.push(<Divider />);
  filteredItems.push(
    <DropdownList>
      <DropdownItem key="upload" value="upload" id="upload" icon={<UploadIcon />}>
        Upload from computer
      </DropdownItem>
    </DropdownList>
  );

  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      <AttachMenu
        filteredItems={filteredItems}
        isOpen={isOpen}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        onOpenChangeKeys={['Escape']}
        menuRef={menuRef}
        // eslint-disable-next-line no-console
        onSelect={(_ev, value) => console.log('selected', value)}
        handleTextInputChange={onTextChange}
        popperProps={{ direction: 'up', distance: '8' }}
        searchInputPlaceholder="Search cluster resources..."
        toggle={(toggleRef) => (
          <Button
            style={{
              alignItems: 'center',
              borderRadius: '50%',
              display: 'flex',
              height: '48px',
              justifyContent: 'center',
              padding: '0',
              width: '48px',
              lineHeight: '1rem'
            }}
            ref={toggleRef}
            onClick={onToggleClick}
            icon={<img src={PaperclipIcon} alt="Add an attachment" />}
          />
        )}
      />
    </div>
  );
};
