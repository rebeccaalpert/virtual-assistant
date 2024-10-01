import React from 'react';
import { ChatbotDisplayMode } from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import ChatbotConversationHistoryNav from '../../../../../../dist/esm/ChatbotConversationHistoryNav';
import ChatbotHeader, { ChatbotHeaderMain, ChatbotHeaderMenu } from '../../../../../../dist/esm/ChatbotHeader';
import { DropdownItem, DropdownList } from '@patternfly/react-core';

interface Conversation {
  /** Conversation id */
  id: string;
  /** Connversation icon */
  icon?: React.ReactNode;
  /** Conversation */
  text: string;
  /** Dropdown items rendered in conversation options dropdown */
  menuItems?: React.ReactNode;
  /** Optional classname applied to conversation options dropdown */
  menuClassName?: string;
  /** Tooltip content and aria-label applied to conversation options dropdown */
  label?: string;
  /** Callback for when user selects item. */
  onSelect?: (event?: React.MouseEvent, value?: string | number) => void;
}

interface ConversationObject {
  [key: string]: Conversation[];
}

const menuItems = [
  <DropdownList key="list-1">
    <DropdownItem value="Share" id="Share">
      Share
    </DropdownItem>
    <DropdownItem value="Rename" id="Rename">
      Rename
    </DropdownItem>
    <DropdownItem value="Archive" id="Archive">
      Archive
    </DropdownItem>
    <DropdownItem value="Delete" id="Delete">
      Delete
    </DropdownItem>
  </DropdownList>
];

const initialConversations: ConversationObject = {
  Today: [{ id: '1', text: 'Red Hat products and services', menuItems }],
  'This month': [
    {
      id: '2',
      text: 'Enterprise Linux installation and setup',
      menuItems
    },
    { id: '3', text: 'Troubleshoot system crash', menuItems }
  ],
  March: [
    { id: '4', text: 'Ansible security and updates', menuItems },
    { id: '5', text: 'Red Hat certification', menuItems },
    { id: '6', text: 'Lightspeed user documentation', menuItems }
  ],
  February: [
    { id: '7', text: 'Crashing pod assistance', menuItems },
    { id: '8', text: 'OpenShift AI pipelines', menuItems },
    { id: '9', text: 'Updating subscription plan', menuItems },
    { id: '10', text: 'Red Hat licensing options', menuItems }
  ],
  January: [
    { id: '11', text: 'RHEL system performance', menuItems },
    { id: '12', text: 'Manage user accounts', menuItems }
  ]
};

export const ChatbotHeaderTitleDemo: React.FunctionComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [conversations, setConversations] = React.useState<Conversation[] | ConversationObject>(initialConversations);

  const displayMode = ChatbotDisplayMode.fullscreen;

  const findMatchingItems = (targetValue: string) => {
    let filteredConversations = Object.entries(initialConversations).reduce((acc, [key, items]) => {
      const filteredItems = items.filter((item) => item.text.toLowerCase().includes(targetValue.toLowerCase()));
      if (filteredItems.length > 0) {
        acc[key] = filteredItems;
      }
      return acc;
    }, {});

    if (Object.keys(filteredConversations).length === 0) {
      filteredConversations = [{ id: '13', icon: '', text: 'No results found' }];
    }

    return filteredConversations;
  };

  return (
    <ChatbotConversationHistoryNav
      displayMode={displayMode}
      onDrawerToggle={() => setIsDrawerOpen(!isDrawerOpen)}
      isDrawerOpen={isDrawerOpen}
      activeItemId="1"
      // eslint-disable-next-line no-console
      onSelectActiveItem={(e, selectedItem) => console.log(`Selected history item with id ${selectedItem}`)}
      conversations={conversations}
      onNewChat={() => {
        setIsDrawerOpen(!isDrawerOpen);
      }}
      handleTextInputChange={(value: string) => {
        if (value === '') {
          setConversations(initialConversations);
        }
        // this is where you would perform search on the items in the drawer
        // and update the state
        const newConversations = findMatchingItems(value);
        setConversations(newConversations);
      }}
      drawerContent={
        <ChatbotHeader>
          <ChatbotHeaderMain>
            <ChatbotHeaderMenu aria-expanded={isDrawerOpen} onMenuToggle={() => setIsDrawerOpen(!isDrawerOpen)} />
          </ChatbotHeaderMain>
        </ChatbotHeader>
      }
    ></ChatbotConversationHistoryNav>
  );
};
