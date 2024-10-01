import React from 'react';
import Chatbot, { ChatbotDisplayMode } from '@patternfly/virtual-assistant/dist/dynamic/Chatbot';
import ChatbotConversationHistoryNav, {
  Conversation
} from '@patternfly/virtual-assistant/dist/dynamic/ChatbotConversationHistoryNav';
import {
  ChatbotHeader,
  ChatbotHeaderMain,
  ChatbotHeaderMenu,
  ChatbotHeaderTitle
} from '@patternfly/virtual-assistant/dist/dynamic/ChatbotHeader';

const conversations: {
  [key: string]: Conversation[];
} = {
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
  const [isOpen, setIsOpen] = React.useState(false);
  const displayMode = ChatbotDisplayMode.embedded;

  return (
    <Chatbot displayMode={displayMode}>
      <ChatbotConversationHistoryNav
        displayMode={displayMode}
        onDrawerToggle={() => setIsOpen(!isOpen)}
        isDrawerOpen={isOpen}
        conversations={conversations}
        drawerContent={
          <>
            <ChatbotHeader>
              <ChatbotHeaderMain>
                <ChatbotHeaderMenu aria-expanded={isOpen} onMenuToggle={() => setIsOpen(!isOpen)} />
                <ChatbotHeaderTitle>Click the menu to open and close the drawer</ChatbotHeaderTitle>
              </ChatbotHeaderMain>
            </ChatbotHeader>
          </>
        }
      />
    </Chatbot>
  );
};
