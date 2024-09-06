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
    setIsOpen((prevIsOpen) => !prevIsOpen);
    setFilteredIds(['*']);
  };

  React.useEffect(() => {
    if (isOpen && menuRef.current) {
      const firstElement = menuRef.current.querySelector(
        'li > button:not(:disabled), li > a:not(:disabled), input:not(:disabled)'
      );
      firstElement && (firstElement as HTMLElement).focus();
      setRefFullOptions(Array.from(menuRef.current.querySelectorAll('li:not(li[role=separator])>*:first-child')));
    }
  }, [isOpen]);

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

  const filterItems = (items: any[]) => {
    if (filteredIds.length === 1 && filteredIds[0] === '*') {
      return items;
    }

    const filterChildren = (children: any) => {
      if (!Array.isArray(children)) {
        children = [children];
      }
      return children.filter((child) => filteredIds.includes(child.props.value));
    };

    const filterGroup = (group: any) => {
      if (group.type === DropdownGroup) {
        const filteredChildren = filterChildren(group.props.children.props.children);
        if (filteredChildren.length > 0) {
          return React.cloneElement(group, {
            children: React.cloneElement(group.props.children, {
              children: filteredChildren.length > 1 ? filteredChildren : filteredChildren[0]
            })
          });
        }
      } else if (group.type === DropdownList) {
        const filteredChildren = filterChildren(group.props.children);
        if (filteredChildren.length > 0) {
          return React.cloneElement(group, {
            children: filteredChildren.length > 1 ? filteredChildren : filteredChildren[0]
          });
        }
      } else if (filteredIds.includes(group.props.value) || group.type === Divider) {
        return group;
      }
    };

    const filteredCopy = items.reduce((acc, group) => {
      const filteredGroup = filterGroup(group);
      if (filteredGroup) {
        acc.push(filteredGroup);
      }
      return acc;
    }, []);

    // Remove the last divider if present
    if (filteredCopy.length > 0 && filteredCopy[filteredCopy.length - 1].type === Divider) {
      filteredCopy.pop();
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

  const filteredItems = filterItems(menuItems);
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
