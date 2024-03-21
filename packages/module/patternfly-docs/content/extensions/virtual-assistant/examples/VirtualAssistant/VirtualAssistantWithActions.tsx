import React from 'react';
import VirtualAssistant from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistant';
import VirtualAssistantAction from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistantAction';
import { AngleDownIcon } from '@patternfly/react-icons';

export const VirtualAssistantWithActions: React.FunctionComponent = () => (
  <VirtualAssistant actions={<>
    <VirtualAssistantAction aria-label="Minimize virtual assistant">
      <AngleDownIcon/>
    </VirtualAssistantAction>
  </>} />
);
