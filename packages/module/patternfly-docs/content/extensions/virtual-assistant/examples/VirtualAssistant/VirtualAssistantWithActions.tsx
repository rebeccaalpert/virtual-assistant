import React from 'react';
import VirtualAssistant from '@patternfly/virtual-assistant/dist/dynamic/VirtualAssistant';
import VirtualAssistantAction from '@patternfly/virtual-assistant/dist/cjs/VirtualAssistantAction';
import { AngleDownIcon } from '@patternfly/react-icons';

export const VirtualAssistantWithActions: React.FunctionComponent = () => (
  <VirtualAssistant actions={<>
    <VirtualAssistantAction>
      <AngleDownIcon/>
    </VirtualAssistantAction>
  </>} />
);
