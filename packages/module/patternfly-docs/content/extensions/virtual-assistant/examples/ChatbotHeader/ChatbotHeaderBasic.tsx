import React from 'react';
import { Brand, Bullseye, DropdownGroup, DropdownItem, DropdownList, Title } from '@patternfly/react-core';
import {
  ChatbotHeader,
  ChatbotHeaderMenu,
  ChatbotHeaderActions,
  ChatbotHeaderTitle,
  ChatbotHeaderOptionsDropdown,
  ChatbotHeaderSelectorDropdown
} from '@patternfly/virtual-assistant/dist/dynamic/ChatbotHeader';
import OutlinedWindowRestoreIcon from '@patternfly/react-icons/dist/esm/icons/outlined-window-restore-icon';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-icon';
import OpenDrawerRightIcon from '@patternfly/react-icons/dist/esm/icons/open-drawer-right-icon';

import logo from './logo.svg';

export const BasicDemo: React.FunctionComponent = () => {
  const [selectedModel, setSelectedModel] = React.useState('Granite Code 7B');

  const onSelectModel = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined
  ) => {
    setSelectedModel(value as string);
  };

  return (
    <ChatbotHeader>
      <ChatbotHeaderMenu onMenuToggle={() => alert('Menu toggle clicked')} />
      <ChatbotHeaderTitle>
        <Bullseye>
          <Brand src={logo} alt="Branding for chatbot" style={{ marginRight: '10px' }} />
          <Title headingLevel="h1" size="2xl">
            Chatbot Extension
          </Title>
        </Bullseye>
      </ChatbotHeaderTitle>
      <ChatbotHeaderActions>
        <ChatbotHeaderSelectorDropdown value={selectedModel} onSelect={onSelectModel}>
          <DropdownList>
            <DropdownItem value="Granite Code 7B" key="granite">
              Granite Code 7B
            </DropdownItem>
            <DropdownItem value="Llama 3.0" key="llama">
              Llama 3.0
            </DropdownItem>
            <DropdownItem value="Mistral 3B" key="mistral">
              Mistral 3B
            </DropdownItem>
          </DropdownList>
        </ChatbotHeaderSelectorDropdown>
        <ChatbotHeaderOptionsDropdown>
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
        </ChatbotHeaderOptionsDropdown>
      </ChatbotHeaderActions>
    </ChatbotHeader>
  );
};
