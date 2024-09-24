import React from 'react';
import { ChatbotDisplayMode } from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import ChatbotConversationHistoryNav from '@patternfly/virtual-assistant/dist/dynamic/ChatbotConversationHistoryNav';
import {
  ChatbotHeader,
  ChatbotHeaderMain,
  ChatbotHeaderMenu
} from '@patternfly/virtual-assistant/dist/dynamic/ChatbotHeader';
interface navItem {
  [key: string]: { id: string; text: string }[];
}

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
  onSelectItem?: (event?: React.MouseEvent, value?: string | number) => void;
}

interface ConversationObject {
  [key: string]: Conversation[];
}

const initialConversations: ConversationObject = {
  Today: [{ id: '1', text: 'Red Hat products and services' }],
  'This month': [
    {
      id: '2',
      text: 'Enterprise Linux installation and setup'
    },
    { id: '3', text: 'Troubleshoot system crash' }
  ],
  March: [
    { id: '4', text: 'Ansible security and updates' },
    { id: '5', text: 'Red Hat certification' },
    { id: '6', text: 'Lightspeed user documentation' }
  ],
  February: [
    { id: '7', text: 'Crashing pod assistance' },
    { id: '8', text: 'OpenShift AI pipelines' },
    { id: '9', text: 'Updating subscription plan' },
    { id: '10', text: 'Red Hat licensing options' }
  ],
  January: [
    { id: '11', text: 'RHEL system performance' },
    { id: '12', text: 'Manage user accounts' }
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
        const newConversations: navItem = findMatchingItems(value);
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
