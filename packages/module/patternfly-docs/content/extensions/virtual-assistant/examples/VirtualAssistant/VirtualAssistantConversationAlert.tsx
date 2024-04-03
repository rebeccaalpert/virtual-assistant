import React from 'react';
import VirtualAssistant from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistant';
import ConversationAlert from '@patternfly/virtual-assistant/dist/esm/ConversationAlert'

export const BasicExample: React.FunctionComponent = () => (
  <VirtualAssistant >
    <ConversationAlert>You can start a new conversation at any time by typing below.</ConversationAlert>
  </VirtualAssistant>
);