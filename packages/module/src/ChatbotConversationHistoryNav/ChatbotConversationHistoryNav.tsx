// ============================================================================
// Chatbot Header - Chatbot Conversation History Nav
// ============================================================================
import React from 'react';

// Import PatternFly components
import {
  Button,
  Drawer,
  DrawerPanelContent,
  DrawerContent,
  DrawerPanelBody,
  DrawerProps,
  DrawerHead,
  DrawerActions,
  DrawerCloseButton,
  Nav,
  NavItem,
  NavGroup,
  Truncate
} from '@patternfly/react-core';

import ChatIcon from '@patternfly/react-icons/dist/esm/icons/chat-icon';

export interface NavItemObject {
  id: string;
  icon?: React.ReactNode;
  text: string;
}

export interface ChatbotConversationHistoryNavProps extends DrawerProps {
  onDrawerToggle: (event: KeyboardEvent | React.MouseEvent | React.TransitionEvent) => void;
  isDrawerOpen: boolean;
  activeItemId: string | number;
  onSelectActiveItem: (
    event: React.FormEvent<HTMLInputElement>,
    selectedItem: { groupId: string | number; itemId: string | number; to: string }
  ) => void;
  navAriaLabel: string;
  navItems: NavItemObject[] | { [key: string]: NavItemObject[] };
  newChatButtonText?: string;
}

export const ChatbotConversationHistoryNav: React.FunctionComponent<ChatbotConversationHistoryNavProps> = ({
  onDrawerToggle,
  isDrawerOpen,
  activeItemId,
  onSelectActiveItem,
  navAriaLabel,
  navItems,
  newChatButtonText = 'New chat',
  ...props
}: ChatbotConversationHistoryNavProps) => {
  const getNavItem = (conversation: NavItemObject) => (
    <NavItem
      preventDefault
      itemId={conversation.id}
      isActive={activeItemId === conversation.id}
      key={conversation.id}
      icon={conversation.icon || <ChatIcon />}
    >
      <Truncate content={conversation.text} />
    </NavItem>
  );

  const buildNav = () => {
    if (Array.isArray(navItems)) {
      // Render for array of NavItemObject
      return (
        <>
          {navItems.map((conversation) => (
            <React.Fragment key={conversation.id}>{getNavItem(conversation)}</React.Fragment>
          ))}
        </>
      );
    } else {
      // Render for object with NavItemObject arrays as values
      return (
        <>
          {Object.keys(navItems).map((navGroup) => (
            <NavGroup title={navGroup} key={navGroup}>
              {navItems[navGroup].map((conversation) => (
                <React.Fragment key={conversation.id}>{getNavItem(conversation)}</React.Fragment>
              ))}
            </NavGroup>
          ))}
        </>
      );
    }
  };

  // Menu Content
  // - Consumers should pass an array to <Chatbot> of the list of conversations
  // - Groups could be optional, but items need to be ordered by date
  const menuContent = (
    <>
      <Nav onSelect={onSelectActiveItem} aria-label={navAriaLabel}>
        {buildNav()}
      </Nav>
    </>
  );

  const panelContent = (
    <>
      <DrawerPanelContent>
        <DrawerHead>
          <DrawerActions>
            <DrawerCloseButton onClick={onDrawerToggle} />
            <Button>{newChatButtonText}</Button>
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>{menuContent}</DrawerPanelBody>
      </DrawerPanelContent>
    </>
  );

  return (
    <Drawer
      className="pf-chatbot__menu"
      isExpanded={isDrawerOpen}
      onExpand={onDrawerToggle}
      // isInline={displayMode === 'pf-chatbot--fullscreen' || displayMode === 'pf-chatbot--embedded'}
      position="start"
      {...props}
    >
      <DrawerContent panelContent={panelContent} />
    </Drawer>
  );
};

export default ChatbotConversationHistoryNav;
