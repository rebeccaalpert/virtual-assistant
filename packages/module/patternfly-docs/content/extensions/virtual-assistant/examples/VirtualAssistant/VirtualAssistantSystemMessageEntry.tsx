import React from 'react';
import VirtualAssistant from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistant';
import SystemMessageEntry from '@patternfly/virtual-assistant/dist/esm/SystemMessageEntry'

export const BasicExample: React.FunctionComponent = () => (
  <VirtualAssistant >
    <SystemMessageEntry />
  </VirtualAssistant>
);