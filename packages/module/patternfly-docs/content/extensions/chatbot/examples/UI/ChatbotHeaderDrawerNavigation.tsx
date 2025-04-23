import { useState, FunctionComponent } from 'react';
import { ChatbotDisplayMode } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import ChatbotConversationHistoryNav, {
  Conversation
} from '@patternfly/chatbot/dist/dynamic/ChatbotConversationHistoryNav';
import { Checkbox } from '@patternfly/react-core';

const initialConversations: Conversation[] = [
  { id: '1', text: 'Red Hat products and services', noIcon: true },
  {
    id: '2',
    text: 'Enterprise Linux installation and setup',
    noIcon: true
  },
  { id: '3', text: 'Troubleshoot system crash', noIcon: true },
  { id: '4', text: 'Ansible security and updates', noIcon: true },
  { id: '5', text: 'Red Hat certification', noIcon: true },
  { id: '6', text: 'Lightspeed user documentation', noIcon: true },
  { id: '7', text: 'Crashing pod assistance', noIcon: true },
  { id: '8', text: 'OpenShift AI pipelines', noIcon: true },
  { id: '9', text: 'Updating subscription plan', noIcon: true },
  { id: '10', text: 'Red Hat licensing options', noIcon: true },
  { id: '11', text: 'RHEL system performance', noIcon: true },
  { id: '12', text: 'Manage user accounts', noIcon: true }
];

export const ChatbotHeaderTitleDemo: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isButtonOrderReversed, setIsButtonOrderReversed] = useState(false);
  const [conversations, setConversations] = useState<Conversation[] | { [key: string]: Conversation[] }>(
    initialConversations
  );
  const displayMode = ChatbotDisplayMode.embedded;

  return (
    <>
      <Checkbox
        label="Display drawer"
        isChecked={isOpen}
        onChange={() => {
          setIsOpen(!isOpen);
          setConversations(initialConversations);
        }}
        id="navigation-drawer-visible"
        name="navigation-drawer-visible"
      />
      <Checkbox
        label="Reverse action buttons"
        isChecked={isButtonOrderReversed}
        onChange={() => setIsButtonOrderReversed(!isButtonOrderReversed)}
        id="navigation-drawer-actions-visible"
        name="navigation-drawer-actions-visible"
      ></Checkbox>
      <ChatbotConversationHistoryNav
        displayMode={displayMode}
        onDrawerToggle={() => setIsOpen(!isOpen)}
        isDrawerOpen={isOpen}
        setIsDrawerOpen={setIsOpen}
        // eslint-disable-next-line no-console
        onSelectActiveItem={(e, selectedItem) => console.log(`Selected history item with id ${selectedItem}`)}
        conversations={conversations}
        reverseButtonOrder={isButtonOrderReversed}
        drawerContent={<div>Drawer content</div>}
      />
    </>
  );
};
